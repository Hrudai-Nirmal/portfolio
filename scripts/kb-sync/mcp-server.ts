import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  getPortfolioKbSyncStatus,
  syncPortfolioKb,
} from "./sync-engine.ts";

const server = new McpServer({
  name: "portfolio-kb-sync-mcp",
  version: "1.0.0",
});

server.tool(
  "sync_portfolio_kb",
  "Synchronize Portfolio_KB files to the configured Dify dataset.",
  {
    dryRun: z.boolean().optional(),
    deleteMissing: z.boolean().optional(),
  },
  async ({ dryRun, deleteMissing }) => {
    try {
      const result = await syncPortfolioKb({ dryRun, deleteMissing });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: JSON.stringify({ error: message }) }],
        isError: true,
      };
    }
  },
);

server.tool(
  "get_portfolio_kb_sync_status",
  "Check sync configuration and Dify dataset reachability.",
  {},
  async () => {
    const status = await getPortfolioKbSyncStatus();
    return {
      content: [{ type: "text", text: JSON.stringify(status, null, 2) }],
    };
  },
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
