import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const source = readFileSync(new URL("../student-cloud-progress.js", import.meta.url), "utf8");
const OPERATION_ID = "123e4567-e89b-42d3-a456-426614174000";
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

function environment(db = null, initialRows = []) {
  const values = new Map([
    ["gm_independent_student_profile", JSON.stringify({ nickname: "Learner" })],
    ["gm_independent_pending_progress", JSON.stringify(initialRows)]
  ]);
  const localStorage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  };
  const window = { greatMindsDB: db };
  runInNewContext(source, { window, localStorage, console: { warn() {} } });
  return {
    api: window,
    readRows() { return JSON.parse(values.get("gm_independent_pending_progress") || "[]"); }
  };
}

function database({ user = { id: "student-account-a" }, insertError = null, existing = null, rows = [] } = {}) {
  const calls = { table: null, inserted: null, selected: null, filters: [], order: null, limit: null };
  const query = {
    insert: async row => { calls.inserted = row; return { error: insertError }; },
    select: fields => { calls.selected = fields; return query; },
    eq: (field, value) => { calls.filters.push([field, value]); return query; },
    maybeSingle: async () => ({ data: existing, error: null }),
    order: (field, options) => { calls.order = [field, options]; return query; },
    limit: async value => { calls.limit = value; return { data: rows, error: null }; }
  };
  return {
    calls,
    client: {
      auth: { getUser: async () => ({ data: { user }, error: null }) },
      from(table) { calls.table = table; return query; }
    }
  };
}

test("rejects invalid scores before saving locally or to cloud", async () => {
  const db = database();
  const env = environment(db.client);
  const result = await env.api.gmSaveStudentProgress({ ...validRecord(), score: 11 });
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, false);
  assert.equal(env.readRows().length, 0);
  assert.equal(db.calls.inserted, null);
});

test("keeps progress device-local when no Supabase client is available", async () => {
  const env = environment();
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, true);
  assert.equal(env.readRows().length, 1);
  assert.equal(env.readRows()[0].subject, "Mathematics");
});

test("inserts progress using the currently authenticated student ID", async () => {
  const db = database();
  const env = environment(db.client);
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, true);
  assert.equal(result.localSaved, true);
  assert.equal(db.calls.table, "student_learning_progress");
  assert.equal(db.calls.inserted.student_id, "student-account-a");
  assert.equal(db.calls.inserted.id, OPERATION_ID);
});

test("does not attempt a cloud insert when there is no signed-in user", async () => {
  const db = database({ user: null });
  const env = environment(db.client);
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, true);
  assert.equal(db.calls.inserted, null);
});

test("reports guardian-consent/RLS denial separately from the local save", async () => {
  const db = database({ insertError: { code: "42501" } });
  const env = environment(db.client);
  const result = await env.api.gmSaveStudentProgress(validRecord());
  assert.equal(result.saved, false);
  assert.equal(result.localSaved, true);
  assert.match(result.reason, /consent|account access/i);
});

test("accepts an exact duplicate cloud operation as idempotent", async () => {
  const record = validRecord();
  const db = database({
    insertError: { code: "23505" },
    existing: {
      id: OPERATION_ID,
      student_id: "student-account-a",
      subject: record.subject,
      activity_key: record.activity_key,
      score: record.score,
      max_score: record.max_score,
      correct_count: record.correct_count,
      question_count: record.question_count,
      source: record.source
    }
  });
  const env = environment(db.client);
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
      student_id: "student-account-a",
      subject: record.subject,
      activity_key: record.activity_key,
      score: 7,
      max_score: record.max_score,
      correct_count: 7,
      question_count: record.question_count,
      source: record.source
    }
  });
  const env = environment(db.client);
  const result = await env.api.gmSaveStudentProgress(record);
  assert.equal(result.saved, false);
  assert.match(result.reason, /different progress/i);
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

test("loads progress through the signed-in account and bounded query", async () => {
  const rows = [{ subject: "English", activity_key: "vowels", score: 4, max_score: 5 }];
  const db = database({ rows });
  const env = environment(db.client);
  const result = await env.api.gmLoadMyStudentProgress();
  assert.equal(result.loaded, true);
  assert.equal(result.rows.length, 1);
  assert.equal(db.calls.table, "student_learning_progress");
  assert.equal(db.calls.limit, 100);
  assert.equal(db.calls.order[0], "completed_at");
  assert.equal(db.calls.order[1].ascending, false);
});
