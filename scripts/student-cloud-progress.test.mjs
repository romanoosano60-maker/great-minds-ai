import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const source = readFileSync(new URL("../student-cloud-progress.js", import.meta.url), "utf8");
const OPERATION_ID = "123e4567-e89b-42d3-a456-426614174000";
const STUDENT_A = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const STUDENT_B = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const validRecord = () => ({
  id: OPERATION_ID,
  subject: "Mathematics",
  activity_key: "addition-1",
  score: 8,
  max_score: 10,
  correct_count: 8,
  question_count: 10,
  source: "lesson",
  level: "beginner"
});

function environment(db = null, initialRows = [], initialQueue = []) {
  const values = new Map([
    ["gm_independent_student_profile", JSON.stringify({ nickname: "Learner" })],
    ["gm_independent_pending_progress", JSON.stringify(initialRows)],
    ["gm_authenticated_progress_sync_queue", JSON.stringify(initialQueue)]
  ]);
  const timers = [];
  const listeners = {};
  const localStorage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  };
  const window = {
    greatMindsDB: db ? db.client : null,
    setTimeout(fn) { timers.push(fn); return timers.length; },
    addEventListener(name, fn) { listeners[name] = fn; }
  };
  runInNewContext(source, { window, localStorage, console: { warn() {} } });
  return {
    api: window,
    readRows() { return JSON.parse(values.get("gm_independent_pending_progress") || "[]"); },
    readQueue() { return JSON.parse(values.get("gm_authenticated_progress_sync_queue") || "[]"); },
    timers,
    listeners
  };
}

function database({ user = { id: STUDENT_A }, insertError = null, existing = null, rows = [] } = {}) {
  const state = { user, insertError, existing, rows, userError: null, session: user ? { user } : null, sessionError: null };
  const calls = { table: null, inserted: [], selected: null, filters: [], order: null, limit: null, authListener: null };
  const query = {
    insert: async row => {
      calls.inserted.push({ ...row });
      const error = typeof state.insertError === "function" ? state.insertError(row, calls.inserted.length) : state.insertError;
      return { error };
    },
    select: fields => { calls.selected = fields; return query; },
    eq: (field, value) => { calls.filters.push([field, value]); return query; },
    maybeSingle: async () => ({ data: state.existing, error: null }),
    order: (field, options) => { calls.order = [field, options]; return query; },
    limit: async value => { calls.limit = value; return { data: state.rows, error: null }; }
  };
  return {
    state,
    calls,
    client: {
      auth: {
        getUser: async () => ({ data: { user: state.user }, error: state.userError }),
        getSession: async () => ({ data: { session: state.session }, error: state.sessionError }),
        onAuthStateChange(callback) {
          calls.authListener = callback;
          return { data: { subscription: { unsubscribe() {} } } };
        }
      },
      from(table) { calls.table = table; return query; }
    }
  };
}

function queuedItem(index, ownerId = STUDENT_A, createdAt = new Date().toISOString()) {
  return {
    schema_version: 1,
    id: "00000000-0000-4000-8000-" + String(index).padStart(12, "0"),
    owner_id: ownerId,
    created_at: createdAt,
    subject: "Mathematics",
    activity_key: "queued-" + index,
    score: 1,
    max_score: 2,
    correct_count: 1,
    question_count: 2,
    source: "lesson"
  };
}

test("rejects invalid scores before saving locally or to cloud", async () => {
  const db = database();
  const env = environment(db);
  const result = await env.api.gmSaveStudentProgress({ ...validRecord(), score: 11 });
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, false);
  assert.equal(env.readRows().length, 0);
  assert.equal(db.calls.inserted.length, 0);
});

test("keeps progress device-local when no Supabase client is available", async () => {
  const env = environment();
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, true);
  assert.equal(env.readRows().length, 1);
  assert.equal(env.readQueue().length, 0);
  assert.equal(env.readRows()[0].subject, "Mathematics");
});

test("inserts progress using the currently authenticated student ID", async () => {
  const db = database();
  const env = environment(db);
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, true);
  assert.equal(result.localSaved, true);
  assert.equal(db.calls.table, "student_learning_progress");
  assert.equal(db.calls.inserted[0].student_id, STUDENT_A);
  assert.equal(db.calls.inserted[0].id, OPERATION_ID);
  assert.equal(env.readQueue().length, 0);
});

test("does not attempt a cloud insert or queue a record when there is no signed-in user", async () => {
  const db = database({ user: null });
  const env = environment(db);
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, true);
  assert.equal(db.calls.inserted.length, 0);
  assert.equal(env.readQueue().length, 0);
});

test("queues an RLS/guardian-consent denial for the same signed-in account", async () => {
  const db = database({ insertError: { code: "42501" } });
  const env = environment(db);
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, true);
  assert.equal(result.queued, true);
  assert.match(result.reason, /queued/i);
  assert.equal(env.readQueue().length, 1);
  assert.equal(env.readQueue()[0].owner_id, STUDENT_A);
  assert.equal(env.readQueue()[0].id, OPERATION_ID);
  assert.equal("student_nickname" in env.readQueue()[0], false);
});

test("retries a queued record after access is restored for the same account", async () => {
  const db = database({ insertError: { code: "42501" } });
  const env = environment(db);
  await env.api.gmSaveStudentProgress(validRecord());
  db.state.insertError = null;
  const result = await env.api.gmSyncPendingStudentProgress();
  assert.equal(result.synced, 1);
  assert.equal(result.pending, 0);
  assert.equal(env.readQueue().length, 0);
  assert.equal(db.calls.inserted.length, 2);
  assert.equal(db.calls.inserted[1].id, OPERATION_ID);
  assert.equal(db.calls.inserted[1].student_id, STUDENT_A);
});


test("queues offline saves against the cached session but waits for server verification", async () => {
  const db = database();
  db.state.userError = { message: "offline" };
  db.state.session = { user: { id: STUDENT_A } };
  const env = environment(db);
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, false);
  assert.equal(result.queued, true);
  assert.equal(db.calls.inserted.length, 0);
  assert.equal(env.readQueue()[0].owner_id, STUDENT_A);
  db.state.userError = null;
  db.state.user = { id: STUDENT_A };
  const retry = await env.api.gmSyncPendingStudentProgress();
  assert.equal(retry.synced, 1);
  assert.equal(retry.pending, 0);
  assert.equal(db.calls.inserted.length, 1);
});

test("never transfers account A's queued progress to account B", async () => {
  const db = database({ insertError: { code: "42501" } });
  const env = environment(db);
  await env.api.gmSaveStudentProgress(validRecord());
  db.state.user = { id: STUDENT_B };
  db.state.insertError = null;
  const result = await env.api.gmSyncPendingStudentProgress();
  assert.equal(result.synced, 0);
  assert.equal(result.pending, 1);
  assert.equal(db.calls.inserted.length, 1);
  assert.equal(env.readQueue()[0].owner_id, STUDENT_A);
});

test("does not auto-upload legacy anonymous local history", async () => {
  const legacy = { subject: "English", activity_key: "old-local", score: 3, max_score: 5 };
  const db = database();
  const env = environment(db, [legacy]);
  const result = await env.api.gmSyncPendingStudentProgress();
  assert.equal(result.synced, 0);
  assert.equal(result.pending, 0);
  assert.equal(db.calls.inserted.length, 0);
  assert.equal(env.readRows().length, 1);
});

test("generates a stable queue operation ID when a signed-in caller omits one", async () => {
  const db = database({ insertError: { code: "42501" } });
  const env = environment(db);
  const record = validRecord();
  delete record.id;
  const result = await env.api.gmSaveStudentProgress(record);
  assert.equal(result.queued, true);
  assert.match(env.readQueue()[0].id, /^[0-9a-f-]{36}$/i);
  assert.equal(db.calls.inserted[0].id, env.readQueue()[0].id);
});

test("accepts an exact duplicate cloud operation as idempotent", async () => {
  const record = validRecord();
  const db = database({
    insertError: { code: "23505" },
    existing: {
      id: OPERATION_ID,
      student_id: STUDENT_A,
      subject: record.subject,
      activity_key: record.activity_key,
      score: record.score,
      max_score: record.max_score,
      correct_count: record.correct_count,
      question_count: record.question_count,
      source: record.source
    }
  });
  const env = environment(db);
  const result = await env.api.gmSaveStudentProgress(record);
  assert.equal(result.saved, true);
  assert.equal(result.idempotent, true);
});

test("rejects a duplicate cloud operation whose stored values differ", async () => {
  const record = validRecord();
  const db = database({
    insertError: { code: "23505" },
    existing: {
      id: OPERATION_ID,
      student_id: STUDENT_A,
      subject: record.subject,
      activity_key: record.activity_key,
      score: 7,
      max_score: record.max_score,
      correct_count: 7,
      question_count: record.question_count,
      source: record.source
    }
  });
  const env = environment(db);
  const result = await env.api.gmSaveStudentProgress(record);
  assert.equal(result.saved, false);
  assert.match(result.reason, /different progress/i);
  assert.equal(env.readQueue().length, 0);
});

test("does not overwrite a conflicting device-local operation ID", async () => {
  const existing = { ...validRecord(), score: 6, correct_count: 6 };
  const env = environment(null, [existing]);
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, false);
  assert.equal(env.readRows().length, 1);
  assert.equal(env.readRows()[0].score, 6);
});

test("keeps queued records when the retry queue reaches its safety limit", async () => {
  const initialQueue = Array.from({ length: 100 }, (_, index) => queuedItem(index + 1));
  const db = database({ insertError: { code: "42501" } });
  const env = environment(db, [], initialQueue);
  const record = validRecord();
  record.id = "123e4567-e89b-42d3-a456-426614174001";
  const result = await env.api.gmSaveStudentProgress(record);
  assert.equal(result.queued, false);
  assert.equal(env.readQueue().length, 100);
  assert.equal(env.readQueue()[0].id, initialQueue[0].id);
});

test("drops expired queue entries without uploading them", async () => {
  const expired = queuedItem(501, STUDENT_A, new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString());
  const db = database();
  const env = environment(db, [], [expired]);
  const result = await env.api.gmSyncPendingStudentProgress();
  assert.equal(result.synced, 0);
  assert.equal(result.pending, 0);
  assert.equal(db.calls.inserted.length, 0);
});

test("loads progress through the signed-in account and bounded query", async () => {
  const rows = [{ subject: "English", activity_key: "vowels", score: 4, max_score: 5 }];
  const db = database({ rows });
  const env = environment(db);
  const result = await env.api.gmLoadMyStudentProgress();
  assert.equal(result.loaded, true);
  assert.equal(result.rows.length, 1);
  assert.equal(db.calls.table, "student_learning_progress");
  assert.equal(db.calls.limit, 100);
  assert.equal(db.calls.order[0], "completed_at");
  assert.equal(db.calls.order[1].ascending, false);
});
