import {
  DEFAULT_DIFY_API_BASE_URL,
} from "./types.ts";
import type { DifyDocument, SyncStatusResult } from "./types.ts";

interface ListResponse {
  docs: DifyDocument[];
  hasMore: boolean;
}

interface DatasetRecord {
  id: string;
  name: string;
}

function joinApiPath(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

function extractDocs(payload: unknown): ListResponse {
  const data = payload as
    | {
        data?: unknown;
        has_more?: boolean;
      }
    | undefined;

  const topLevelDocs = Array.isArray(data?.data) ? data?.data : undefined;
  const nestedData =
    !topLevelDocs &&
    data &&
    typeof data.data === "object" &&
    data.data !== null
      ? (data.data as { data?: unknown; has_more?: boolean })
      : undefined;
  const nestedDocs = Array.isArray(nestedData?.data) ? nestedData.data : [];
  const rawDocs = topLevelDocs ?? nestedDocs;
  const hasMore = Boolean(data?.has_more ?? nestedData?.has_more);

  const docs: DifyDocument[] = rawDocs
    .map((item) => item as { id?: unknown; name?: unknown })
    .filter((item) => typeof item.id === "string" && typeof item.name === "string")
    .map((item) => ({ id: item.id as string, name: item.name as string }));

  return { docs, hasMore };
}

function extractDatasets(
  payload: unknown,
): { datasets: DatasetRecord[]; hasMore: boolean } {
  const data = payload as
    | {
        data?: unknown;
        has_more?: boolean;
      }
    | undefined;

  const raw = Array.isArray(data?.data) ? data.data : [];
  const datasets: DatasetRecord[] = raw
    .map((item) => item as { id?: unknown; name?: unknown })
    .filter((item) => typeof item.id === "string" && typeof item.name === "string")
    .map((item) => ({ id: item.id as string, name: item.name as string }));

  return { datasets, hasMore: Boolean(data?.has_more) };
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as
      | { message?: unknown; code?: unknown }
      | undefined;
    const msg = typeof payload?.message === "string" ? payload.message : undefined;
    const code = typeof payload?.code === "string" ? payload.code : undefined;
    if (msg && code) return `${response.status} ${code}: ${msg}`;
    if (msg) return `${response.status}: ${msg}`;
  } catch {
    // Fall through to text parse.
  }

  try {
    const text = await response.text();
    if (text) return `${response.status}: ${text}`;
  } catch {
    // Ignore parse issues.
  }

  return `${response.status} ${response.statusText}`.trim();
}

export class DifyClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly datasetId: string;
  private readonly datasetName: string;
  private readonly indexingTechnique: "high_quality" | "economy";
  private resolvedDatasetId?: string;

  constructor() {
    const envBase = process.env.DIFY_API_BASE_URL?.trim();
    this.baseUrl = envBase || DEFAULT_DIFY_API_BASE_URL;
    this.apiKey = process.env.DIFY_API_KEY ?? "";
    this.datasetId = process.env.DIFY_DATASET_ID ?? "";
    this.datasetName = process.env.DIFY_DATASET_NAME ?? "";
    this.indexingTechnique =
      process.env.DIFY_INDEXING_TECHNIQUE === "economy"
        ? "economy"
        : "high_quality";
  }

  public getConfigStatus(): SyncStatusResult {
    const configValid = Boolean(
      this.apiKey && (this.datasetId || this.datasetName),
    );
    return {
      configValid,
      datasetReachable: false,
      managedDocCount: 0,
    };
  }

  public assertConfigured(): void {
    if (!this.apiKey || (!this.datasetId && !this.datasetName)) {
      throw new Error(
        "Missing required Dify configuration. Set DIFY_API_KEY and either DIFY_DATASET_ID or DIFY_DATASET_NAME.",
      );
    }
  }

  private async request(path: string, init: RequestInit): Promise<Response> {
    this.assertConfigured();
    const url = joinApiPath(this.baseUrl, path);
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${this.apiKey}`);
    headers.set("Content-Type", "application/json");
    return fetch(url, { ...init, headers });
  }

  private async resolveDatasetIdByName(): Promise<string> {
    const targetName = this.datasetName.trim();
    if (!targetName) {
      throw new Error("Cannot resolve dataset by name: DIFY_DATASET_NAME is empty.");
    }

    let page = 1;
    const limit = 100;
    const matches: DatasetRecord[] = [];

    while (true) {
      const response = await this.request(
        `/datasets?page=${page}&limit=${limit}`,
        { method: "GET" },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to resolve dataset name "${targetName}": ${await parseApiError(
            response,
          )}`,
        );
      }

      const payload = (await response.json()) as unknown;
      const parsed = extractDatasets(payload);
      matches.push(...parsed.datasets);

      if (!parsed.hasMore) break;
      page += 1;
    }

    const exact = matches.find((d) => d.name === targetName);
    if (exact) return exact.id;

    const caseInsensitive = matches.find(
      (d) => d.name.toLowerCase() === targetName.toLowerCase(),
    );
    if (caseInsensitive) return caseInsensitive.id;

    // Dify may return UI-truncated names like "CHATBOT_PROJECT_DE...".
    const truncationMatches = matches.filter((d) => {
      if (!d.name.includes("...")) return false;
      const prefix = d.name.replace(/\.\.\.$/, "");
      return targetName.toLowerCase().startsWith(prefix.toLowerCase());
    });
    if (truncationMatches.length === 1) return truncationMatches[0].id;
    if (truncationMatches.length > 1) {
      throw new Error(
        `Multiple datasets matched truncated name for "${targetName}". Set DIFY_DATASET_ID to disambiguate.`,
      );
    }

    throw new Error(
      `No dataset named "${targetName}" was found. Set DIFY_DATASET_ID directly or verify DIFY_DATASET_NAME.`,
    );
  }

  private async getDatasetId(): Promise<string> {
    if (this.resolvedDatasetId) return this.resolvedDatasetId;
    if (this.datasetId) {
      this.resolvedDatasetId = this.datasetId;
      return this.resolvedDatasetId;
    }

    this.resolvedDatasetId = await this.resolveDatasetIdByName();
    return this.resolvedDatasetId;
  }

  public async listAllDocuments(): Promise<DifyDocument[]> {
    const datasetId = await this.getDatasetId();
    const docs: DifyDocument[] = [];
    let page = 1;
    const limit = 100;

    while (true) {
      const response = await this.request(
        `/datasets/${datasetId}/documents?page=${page}&limit=${limit}`,
        { method: "GET" },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to list Dify documents: ${await parseApiError(response)}`,
        );
      }

      const payload = (await response.json()) as unknown;
      const parsed = extractDocs(payload);
      docs.push(...parsed.docs);

      if (!parsed.hasMore) break;
      page += 1;
    }

    return docs;
  }

  public async createDocumentByText(name: string, text: string): Promise<void> {
    const datasetId = await this.getDatasetId();
    const response = await this.request(
      `/datasets/${datasetId}/document/create-by-text`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          text,
          indexing_technique: this.indexingTechnique,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to create document "${name}": ${await parseApiError(response)}`,
      );
    }
  }

  public async updateDocumentByText(
    documentId: string,
    name: string,
    text: string,
  ): Promise<void> {
    const datasetId = await this.getDatasetId();
    const response = await this.request(
      `/datasets/${datasetId}/documents/${documentId}/update-by-text`,
      {
        method: "POST",
        body: JSON.stringify({ name, text }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update document "${name}" (${documentId}): ${await parseApiError(
          response,
        )}`,
      );
    }
  }

  public async deleteDocument(documentId: string, name: string): Promise<void> {
    const datasetId = await this.getDatasetId();
    const response = await this.request(
      `/datasets/${datasetId}/documents/${documentId}`,
      { method: "DELETE" },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete document "${name}" (${documentId}): ${await parseApiError(
          response,
        )}`,
      );
    }
  }
}
