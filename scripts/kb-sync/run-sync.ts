import { syncPortfolioKb } from "./sync-engine.ts";

function parseBooleanArg(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`Invalid boolean value "${value}". Use true or false.`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRunArg = args.find((arg) => arg.startsWith("--dry-run="))?.split("=")[1];
  const deleteArg = args
    .find((arg) => arg.startsWith("--delete-missing="))
    ?.split("=")[1];

  const dryRun = parseBooleanArg(dryRunArg, false);
  const deleteMissing = parseBooleanArg(deleteArg, true);
  const result = await syncPortfolioKb({ dryRun, deleteMissing });
  console.log(JSON.stringify(result, null, 2));

  if (result.errors.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
