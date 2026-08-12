import assert from "node:assert/strict";
import { after, test } from "node:test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";

import {
  buildSyncPlan,
  loadSourceDocuments,
  toManagedDocumentName,
} from "../scripts/kb-sync/sync-engine.ts";
import type { DifyDocument } from "../scripts/kb-sync/types.ts";

const tempDirs: string[] = [];

function makeTempRepo(): string {
  const dir = mkdtempSync(path.join(os.tmpdir(), "portfolio-kb-sync-"));
  tempDirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of tempDirs) {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("toManagedDocumentName uses a deterministic prefix and slash normalization", () => {
  assert.equal(
    toManagedDocumentName("foo\\bar\\doc.md"),
    "portfolio-kb::foo/bar/doc.md",
  );
  assert.equal(toManagedDocumentName("a/b/c.txt"), "portfolio-kb::a/b/c.txt");
});

test("loadSourceDocuments reads only markdown and text files under Portfolio_KB", async () => {
  const repo = makeTempRepo();
  const kbRoot = path.join(repo, "Portfolio_KB");
  mkdirSync(path.join(kbRoot, "nested"), { recursive: true });
  writeFileSync(path.join(kbRoot, "root.md"), "# Root");
  writeFileSync(path.join(kbRoot, "nested", "notes.txt"), "hello");
  writeFileSync(path.join(kbRoot, "ignore.json"), "{}");

  const docs = await loadSourceDocuments(repo);
  const relativePaths = docs.map((d) => d.relativePath);
  assert.deepEqual(relativePaths, ["nested/notes.txt", "root.md"]);
});

test("buildSyncPlan creates, updates, and deletes expected documents", () => {
  const sourceDocs = [
    {
      relativePath: "project_description.md",
      managedName: "portfolio-kb::project_description.md",
      text: "A",
    },
    {
      relativePath: "extra.md",
      managedName: "portfolio-kb::extra.md",
      text: "B",
    },
  ];

  const remoteDocs: DifyDocument[] = [
    { id: "1", name: "portfolio-kb::project_description.md" },
    { id: "2", name: "portfolio-kb::deleted.md" },
    { id: "3", name: "external-unmanaged-doc" },
  ];

  const plan = buildSyncPlan(sourceDocs, remoteDocs, true);
  assert.deepEqual(
    plan.toCreate.map((d) => d.managedName),
    ["portfolio-kb::extra.md"],
  );
  assert.deepEqual(
    plan.toUpdate.map((d) => d.source.managedName),
    ["portfolio-kb::project_description.md"],
  );
  assert.deepEqual(
    plan.toDelete.map((d) => d.name),
    ["portfolio-kb::deleted.md"],
  );
});
