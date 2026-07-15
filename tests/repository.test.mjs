import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("editor exposes workflow and permission concepts", async () => {
  const source = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );
  for (const concept of [
    "Version history",
    "canPublish",
    "canApprove",
    "Live preview",
    "Content models",
  ])
    assert.match(source, new RegExp(concept, "i"));
});

test("metadata describes CanvasCore", async () => {
  const source = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /CanvasCore CMS/);
  assert.match(source, /og\.png/);
});
