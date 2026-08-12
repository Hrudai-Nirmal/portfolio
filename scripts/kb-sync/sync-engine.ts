import { promises as fs } from "fs";
import path from "path";

import { DifyClient } from "./dify-client.ts";
import {
  KB_ALLOWED_EXTENSIONS,
  KB_SOURCE_DIR,
  MANAGED_DOC_PREFIX,
} from "./types.ts";
import type {
  DifyDocument,
  SourceDocument,
  SyncOptions,
  SyncPlan,
  SyncResult,
  SyncStatusResult,
} from "./types.ts";

export function toManagedDocumentName(relativePath: string): string {
  return `${MANAGED_DOC_PREFIX}${relativePath.replaceAll("\\", "/")}`;
}

async function listKnowledgeFilesRecursive(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listKnowledgeFilesRecursive(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (entry.isFile() && KB_ALLOWED_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function loadSourceDocuments(
  repoRoot: string,
): Promise<SourceDocument[]> {
  const sourceRoot = path.join(repoRoot, KB_SOURCE_DIR);
  const files = await listKnowledgeFilesRecursive(sourceRoot);
  files.sort((a, b) => a.localeCompare(b));

  const docs: SourceDocument[] = [];
  for (const file of files) {
    const relativePath = path.relative(sourceRoot, file).replaceAll("\\", "/");
    const text = await fs.readFile(file, "utf8");
    docs.push({
      relativePath,
      managedName: toManagedDocumentName(relativePath),
      text,
    });
  }

  return docs;
}

function indexManagedDocuments(docs: DifyDocument[]): Map<string, DifyDocument> {
  const index = new Map<string, DifyDocument>();
  for (const doc of docs) {
    if (!doc.name.startsWith(MANAGED_DOC_PREFIX)) continue;
    index.set(doc.name, doc);
  }
  return index;
}

export function buildSyncPlan(
  sourceDocs: SourceDocument[],
  remoteDocs: DifyDocument[],
  deleteMissing: boolean,
): SyncPlan {
  const managedRemote = indexManagedDocuments(remoteDocs);
  const sourceNameSet = new Set<string>();
  const toCreate: SourceDocument[] = [];
  const toUpdate: Array<{ source: SourceDocument; remote: DifyDocument }> = [];

  for (const source of sourceDocs) {
    sourceNameSet.add(source.managedName);
    const existing = managedRemote.get(source.managedName);
    if (!existing) {
      toCreate.push(source);
      continue;
    }

    toUpdate.push({ source, remote: existing });
  }

  const toDelete: DifyDocument[] = [];
  if (deleteMissing) {
    for (const doc of managedRemote.values()) {
      if (!sourceNameSet.has(doc.name)) toDelete.push(doc);
    }
  }

  return { toCreate, toUpdate, toDelete };
}

export async function getPortfolioKbSyncStatus(): Promise<SyncStatusResult> {
  const client = new DifyClient();
  const base = client.getConfigStatus();
  if (!base.configValid) return base;

  try {
    const docs = await client.listAllDocuments();
    return {
      configValid: true,
      datasetReachable: true,
      managedDocCount: docs.filter((doc) =>
        doc.name.startsWith(MANAGED_DOC_PREFIX),
      ).length,
    };
  } catch {
    return {
      configValid: true,
      datasetReachable: false,
      managedDocCount: 0,
    };
  }
}

export async function syncPortfolioKb(
  options: SyncOptions = {},
): Promise<SyncResult> {
  const dryRun = options.dryRun ?? false;
  const deleteMissing = options.deleteMissing ?? true;
  const repoRoot = process.cwd();
  const sourceDocs = await loadSourceDocuments(repoRoot);
  const client = new DifyClient();
  client.assertConfigured();

  const remoteDocs = await client.listAllDocuments();
  const plan = buildSyncPlan(sourceDocs, remoteDocs, deleteMissing);

  const result: SyncResult = {
    scannedFiles: sourceDocs.map((doc) => doc.relativePath),
    created: [],
    updated: [],
    deleted: [],
    skipped: [],
    errors: [],
  };

  for (const source of plan.toCreate) {
    if (dryRun) {
      result.skipped.push(`create:${source.managedName}`);
      continue;
    }
    try {
      await client.createDocumentByText(source.managedName, source.text);
      result.created.push(source.managedName);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push({ file: source.relativePath, message });
    }
  }

  for (const op of plan.toUpdate) {
    if (dryRun) {
      result.skipped.push(`update:${op.source.managedName}`);
      continue;
    }
    try {
      await client.updateDocumentByText(
        op.remote.id,
        op.source.managedName,
        op.source.text,
      );
      result.updated.push(op.source.managedName);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push({ file: op.source.relativePath, message });
    }
  }

  for (const doc of plan.toDelete) {
    if (dryRun) {
      result.skipped.push(`delete:${doc.name}`);
      continue;
    }
    try {
      await client.deleteDocument(doc.id, doc.name);
      result.deleted.push(doc.name);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push({ file: doc.name, message });
    }
  }

  return result;
}
