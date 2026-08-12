export const MANAGED_DOC_PREFIX = "portfolio-kb::";
export const DEFAULT_DIFY_API_BASE_URL = "https://api.dify.ai/v1";
export const KB_SOURCE_DIR = "Portfolio_KB";
export const KB_ALLOWED_EXTENSIONS = new Set([".md", ".markdown", ".txt"]);

export interface DifyDocument {
  id: string;
  name: string;
}

export interface SyncError {
  file?: string;
  message: string;
}

export interface SyncResult {
  scannedFiles: string[];
  created: string[];
  updated: string[];
  deleted: string[];
  skipped: string[];
  errors: SyncError[];
}

export interface SyncOptions {
  dryRun?: boolean;
  deleteMissing?: boolean;
}

export interface SyncStatusResult {
  configValid: boolean;
  datasetReachable: boolean;
  managedDocCount: number;
}

export interface SourceDocument {
  relativePath: string;
  managedName: string;
  text: string;
}

export interface SyncPlan {
  toCreate: SourceDocument[];
  toUpdate: Array<{ source: SourceDocument; remote: DifyDocument }>;
  toDelete: DifyDocument[];
}
