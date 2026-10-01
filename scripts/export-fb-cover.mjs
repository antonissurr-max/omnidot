/**
 * Export Facebook Page cover via export-wordmark-only.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(root, "scripts", "export-wordmark-only.mjs");

const child = spawn(process.execPath, [script], { stdio: "inherit", cwd: root });
child.on("exit", (code) => process.exit(code ?? 1));
