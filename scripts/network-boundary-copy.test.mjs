import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const classroomPage = readFileSync(new URL("../international-classrooms.html", import.meta.url), "utf8");
const networkHub = readFileSync(new URL("../secure-network.html", import.meta.url), "utf8");

test("classroom setup identifies itself as a pilot, not a live international network", () => {
  assert.match(classroomPage, /Classroom Setup Pilot/);
  assert.match(classroomPage, /Cross-border network separation and verified country controls are not live yet/);
  assert.match(classroomPage, /does not create a Local School or International Network type/);
});

test("teacher-entered country is explicitly labelled as unverified display data", () => {
  assert.match(classroomPage, /Teacher-reported country \(display only\)/);
  assert.match(classroomPage, /It is not verified and is not used to enforce country-based access/);
  assert.match(classroomPage, /Standard classroom only; country is display-only/);
});

test("network hub distinguishes current family links from future classroom network types", () => {
  assert.match(networkHub, /Guardian relationship model/);
  assert.match(networkHub, /Intended model · not separately enforced/);
  assert.match(networkHub, /Future feature · not enabled/);
  assert.match(networkHub, /Local and International are <strong>not yet separate database network types/);
});
