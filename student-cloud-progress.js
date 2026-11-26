/* Great Minds AI — authenticated progress storage and identity-bound retry.
 * Requires supabase-config.js and Supabase JS v2 to be loaded first.
 * RLS remains the authority for every cloud read/write.
 * Only records created while a user is authenticated may enter the retry queue.
 * Legacy anonymous local history is never auto-uploaded.
 */
(function () {
  "use strict";

  const MAX_SUBJECT = 60;
  const MAX_ACTIVITY = 120;
  const MAX_SOURCE = 40;
  const LOCAL_KEY = "gm_independent_pending_progress";
  const QUEUE_KEY = "gm_authenticated_progress_sync_queue";
  const QUEUE_LIMIT = 100;
  const QUEUE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
  const QUEUE_SCHEMA_VERSION = 1;
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const PERMANENT_DB_ERRORS = new Set(["23514", "23502", "22001", "22P02", "23503"]);
  let syncInProgress = false;
  let syncListenerInstalled = false;
  let onlineListenerInstalled = false;

  function clean(value, max) {
    return String(value == null ? "" : value).trim().slice(0, max);
  }

  function newOperationId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    const bytes = new Uint8Array(16);
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, value => value.toString(16).padStart(2, "0")).join("");
    return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20);
  }

  function sameProgress(a, b) {
    return !!a && !!b &&
      a.subject === b.subject &&
      a.activity_key === b.activity_key &&
      a.score === b.score &&
      a.max_score === b.max_score &&
      a.correct_count === b.correct_count &&
      a.question_count === b.question_count &&
      a.source === b.source;
  }

  function readArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function writeArray(key, rows) {
    try {
      localStorage.setItem(key, JSON.stringify(rows));
      return true;
    } catch (error) {
      console.warn("Great Minds AI progress storage is unavailable:", error);
      return false;
    }
  }

  function validQueueItem(item, now) {
    if (!item || item.schema_version !== QUEUE_SCHEMA_VERSION ||
        !UUID_RE.test(String(item.id || "")) ||
        !UUID_RE.test(String(item.owner_id || "")) ||
        !item.created_at || !Number.isFinite(Date.parse(item.created_at))) return false;
    if (now - Date.parse(item.created_at) > QUEUE_MAX_AGE_MS) return false;
    return !!item.subject && item.subject.length <= MAX_SUBJECT &&
      !!item.activity_key && item.activity_key.length <= MAX_ACTIVITY &&
      !!item.source && item.source.length <= MAX_SOURCE &&
      Number.isInteger(item.score) && Number.isInteger(item.max_score) &&
      item.max_score > 0 && item.score >= 0 && item.score <= item.max_score &&
      (item.correct_count === null || (Number.isInteger(item.correct_count) && item.correct_count >= 0 && item.correct_count <= item.max_score)) &&
      (item.question_count === null || (Number.isInteger(item.question_count) && item.question_count > 0)) &&
      (item.correct_count === null || item.question_count === null || item.correct_count <= item.question_count);
  }

  function readQueue() {
    const now = Date.now();
    const original = readArray(QUEUE_KEY);
    const valid = original.filter(item => validQueueItem(item, now));
    if (valid.length !== original.length) writeArray(QUEUE_KEY, valid);
    return valid;
  }

  function queueItemFor(user, row) {
    return {
      schema_version: QUEUE_SCHEMA_VERSION,
      id: row.id,
      owner_id: user.id,
      created_at: new Date().toISOString(),
      subject: row.subject,
      activity_key: row.activity_key,
      score: row.score,
      max_score: row.max_score,
      correct_count: row.correct_count,
      question_count: row.question_count,
      source: row.source
    };
  }

  function addToQueue(item) {
    const rows = readQueue();
    const existingIndex = rows.findIndex(entry => entry.id === item.id);
    if (existingIndex >= 0) {
      const existing = rows[existingIndex];
      if (existing.owner_id !== item.owner_id || !sameProgress(existing, item)) {
        return { saved: false, conflict: true };
      }
      return { saved: true, duplicate: true };
    }
    if (rows.length >= QUEUE_LIMIT) return { saved: false, full: true };
    rows.push(item);
    return { saved: writeArray(QUEUE_KEY, rows) };
  }

  function removeFromQueue(id, ownerId) {
    const rows = readQueue();
    const remaining = rows.filter(item => !(item.id === id && item.owner_id === ownerId));
    if (remaining.length !== rows.length) writeArray(QUEUE_KEY, remaining);
  }

  async function tryCloudInsert(db, user, row) {
    try {
      const { error } = await db.from("student_learning_progress").insert(row);
      if (!error) return { saved: true };

      if (error.code === "23505" && row.id) {
        const { data: existing, error: lookupError } = await db.from("student_learning_progress")
          .select("id,student_id,subject,activity_key,score,max_score,correct_count,question_count,source")
          .eq("id", row.id)
          .maybeSingle();
        if (lookupError) return { saved: false, retryable: true, reason: "Cloud duplicate verification could not be completed." };
        if (existing && existing.student_id === user.id && sameProgress(existing, row)) {
          return { saved: true, idempotent: true };
        }
        return { saved: false, conflict: true, reason: "This save ID already exists with different progress. Please contact support before retrying." };
      }

      if (PERMANENT_DB_ERRORS.has(error.code)) {
        return { saved: false, permanent: true, reason: "The progress record was rejected by the database. Your device copy remains available." };
      }
      return { saved: false, retryable: true, reason: error.code === "42501" || error.code === "PGRST301"
        ? "Cloud sync is waiting for the required account access or guardian consent."
        : "Cloud sync could not be completed yet." };
    } catch (error) {
      console.warn("Great Minds AI cloud progress was not saved:", error);
      return { saved: false, retryable: true, reason: "Cloud sync could not be completed yet." };
    }
  }

  async function syncPendingProgress() {
    if (syncInProgress) return { synced: 0, pending: readQueue().length, busy: true };
    const db = window.greatMindsDB;
    if (!db || !db.auth || typeof db.auth.getUser !== "function" || typeof db.from !== "function") {
      return { synced: 0, pending: readQueue().length, available: false };
    }

    syncInProgress = true;
    try {
      const { data: userData, error: userError } = await db.auth.getUser();
      if (userError || !userData || !userData.user) {
        return { synced: 0, pending: readQueue().length, signedIn: false };
      }
      const user = userData.user;
      let queue = readQueue();
      let synced = 0;
      let resolved = 0;

      for (const item of queue.slice()) {
        // A queue item is never transferred to a different signed-in account.
        if (item.owner_id !== user.id) continue;
        const row = {
          id: item.id,
          student_id: item.owner_id,
          subject: item.subject,
          activity_key: item.activity_key,
          score: item.score,
          max_score: item.max_score,
          correct_count: item.correct_count,
          question_count: item.question_count,
          source: item.source
        };
        const result = await tryCloudInsert(db, user, row);
        if (result.saved || result.conflict || result.permanent) {
          queue = queue.filter(entry => !(entry.id === item.id && entry.owner_id === item.owner_id));
          resolved++;
          if (result.saved) synced++;
        }
      }

      if (resolved) writeArray(QUEUE_KEY, queue);
      return { synced, pending: queue.length, conflictsOrRejected: resolved - synced };
    } catch (error) {
      console.warn("Great Minds AI pending progress sync stopped safely:", error);
      return { synced: 0, pending: readQueue().length, error: true };
    } finally {
      syncInProgress = false;
    }
  }

  function installSyncListener(db) {
    if (!db || !db.auth) return;
    if (!syncListenerInstalled && typeof db.auth.onAuthStateChange === "function") {
      try {
        db.auth.onAuthStateChange((event, session) => {
          if (!session || !session.user || !["INITIAL_SESSION", "SIGNED_IN", "TOKEN_REFRESHED"].includes(event)) return;
          // Defer the call so no Supabase method is awaited inside its auth callback.
          if (typeof window.setTimeout === "function") {
            window.setTimeout(() => { syncPendingProgress(); }, 0);
          }
        });
        syncListenerInstalled = true;
      } catch (error) {
        console.warn("Great Minds AI progress sync listener could not be installed:", error);
      }
    }
    if (!onlineListenerInstalled && typeof window.addEventListener === "function") {
      window.addEventListener("online", () => { syncPendingProgress(); });
      onlineListenerInstalled = true;
    }
  }

  async function saveProgress(record) {
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      return { saved: false, localSaved: false, reason: "A valid progress record is required." };
    }

    const subject = clean(record.subject, MAX_SUBJECT);
    const activityKey = clean(record.activity_key, MAX_ACTIVITY);
    const source = clean(record.source || "lesson", MAX_SOURCE);
    const score = Number(record.score);
    const maxScore = Number(record.max_score);
    const correct = record.correct_count == null ? null : Number(record.correct_count);
    const questions = record.question_count == null ? null : Number(record.question_count);
    const operationId = record.id == null ? newOperationId() : clean(record.id, 36);

    if (!subject || !activityKey || !source || !UUID_RE.test(operationId) ||
        !Number.isInteger(score) || !Number.isInteger(maxScore) || maxScore <= 0 ||
        score < 0 || score > maxScore ||
        (correct !== null && (!Number.isInteger(correct) || correct < 0 || correct > maxScore)) ||
        (questions !== null && (!Number.isInteger(questions) || questions <= 0)) ||
        (correct !== null && questions !== null && correct > questions)) {
      return { saved: false, localSaved: false, reason: "The progress record did not pass validation." };
    }

    const level = ["beginner", "pro", "advanced"].includes(String(record.level || "").toLowerCase())
      ? String(record.level).toLowerCase() : null;
    let studentNickname = null;
    try {
      const profile = JSON.parse(localStorage.getItem("gm_independent_student_profile") || "null");
      if (profile && typeof profile.nickname === "string") studentNickname = clean(profile.nickname, 35) || null;
    } catch (_) {}

    const db = window.greatMindsDB;
    let user = null;
    let authCheckFailed = false;
    if (db && db.auth && typeof db.auth.getUser === "function" && typeof db.from === "function") {
      installSyncListener(db);
      try {
        const { data: userData, error: userError } = await db.auth.getUser();
        if (userError) authCheckFailed = true;
        else user = userData && userData.user ? userData.user : null;
      } catch (_) {
        authCheckFailed = true;
      }
    }

    const localRecord = {
      id: operationId,
      student_nickname: studentNickname,
      subject,
      activity_key: activityKey,
      score,
      max_score: maxScore,
      correct_count: correct,
      question_count: questions,
      source,
      level,
      completed_at: new Date().toISOString()
    };
    let localSaved = false;
    try {
      const rows = readArray(LOCAL_KEY);
      const existingIndex = rows.findIndex(item => item && item.id === operationId);
      if (existingIndex >= 0) {
        if (!sameProgress(rows[existingIndex], localRecord)) {
          return { saved: false, localSaved: false, reason: "This save ID already exists with different progress. Please contact support before retrying." };
        }
      } else {
        rows.push(localRecord);
      }
      localSaved = writeArray(LOCAL_KEY, rows.slice(-300));
    } catch (error) {
      console.warn("Local independent progress could not be stored:", error);
    }

    if (!db || !db.auth || typeof db.from !== "function") {
      return { saved: false, localSaved, reason: localSaved
        ? "Saved on this device. Secure cloud sync is not connected on this page."
        : "Your progress could not be saved on this device or to the cloud." };
    }
    if (authCheckFailed) {
      return { saved: false, localSaved, reason: localSaved
        ? "Saved on this device. Your account could not be checked, so no cloud upload was attempted."
        : "Your progress could not be saved on this device or to the cloud." };
    }
    if (!user) {
      return { saved: false, localSaved, reason: localSaved
        ? "Saved on this device. Sign in with the intended student account for secure cloud sync."
        : "Your progress could not be saved on this device or to the cloud." };
    }

    const row = {
      id: operationId,
      student_id: user.id,
      subject,
      activity_key: activityKey,
      score,
      max_score: maxScore,
      correct_count: correct,
      question_count: questions,
      source
    };
    const result = await tryCloudInsert(db, user, row);
    if (result.saved) {
      removeFromQueue(operationId, user.id);
      // A successful new save is also a safe opportunity to retry older items for this same account.
      syncPendingProgress();
      return { saved: true, localSaved, idempotent: !!result.idempotent };
    }
    if (result.conflict || result.permanent) {
      return { saved: false, localSaved, reason: result.reason };
    }

    const queued = addToQueue(queueItemFor(user, row));
    if (queued.saved) {
      return { saved: false, localSaved, queued: true, reason: localSaved
        ? "Saved on this device. Secure cloud sync is queued for this signed-in account and will retry when the same account is available."
        : "Secure cloud sync is queued for this signed-in account, but the device history could not be saved." };
    }
    return { saved: false, localSaved, queued: false, reason: queued.conflict
      ? "This save ID is already queued with different progress. Please contact support before retrying."
      : "Saved locally, but the secure sync queue is full or unavailable. Please retry while signed in." };
  }

  async function loadMyProgress() {
    const db = window.greatMindsDB;
    if (!db || !db.auth || !db.from) {
      return { loaded: false, reason: "Supabase is not available on this page.", rows: [] };
    }
    try {
      const { data: userData, error: userError } = await db.auth.getUser();
      if (userError) throw userError;
      if (!userData || !userData.user) {
        return { loaded: false, reason: "Sign in with the student, parent/guardian or approved teacher account first.", rows: [] };
      }
      const { data, error } = await db.from("student_learning_progress")
        .select("subject,activity_key,score,max_score,correct_count,question_count,source,completed_at")
        .order("completed_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return { loaded: true, rows: Array.isArray(data) ? data : [] };
    } catch (error) {
      console.warn("Great Minds AI cloud progress could not be loaded:", error);
      return { loaded: false, reason: "Cloud progress could not be loaded for this account.", rows: [] };
    }
  }

  window.gmSaveStudentProgress = saveProgress;
  window.gmLoadMyStudentProgress = loadMyProgress;
  window.gmSyncPendingStudentProgress = syncPendingProgress;
  installSyncListener(window.greatMindsDB);
})();
