import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = join(projectRoot, "assets", "css");
mkdirSync(outputDirectory, { recursive: true });

const result = spawnSync(
  process.execPath,
  [
    join(projectRoot, "node_modules", "tailwindcss", "lib", "cli.js"),
    "-i",
    join(projectRoot, "src", "tailwind.css"),
    "-o",
    join(outputDirectory, "tailwind.css"),
    "--minify",
  ],
  { cwd: projectRoot, stdio: "inherit" },
);

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
