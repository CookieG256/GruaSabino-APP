import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const webRoot = join(projectRoot, "www");
const assetsRoot = join(projectRoot, "assets");
const fontAwesomeRoot = join(
  projectRoot,
  "node_modules",
  "@fortawesome",
  "fontawesome-free",
);
const fontAwesomeCss = join(assetsRoot, "vendor", "fontawesome", "css");

for (const file of ["index.html", "manifest.json", "privacy.html"]) {
  cpSync(join(projectRoot, file), join(webRoot, file));
}

mkdirSync(fontAwesomeCss, { recursive: true });
cpSync(
  join(fontAwesomeRoot, "css", "all.min.css"),
  join(fontAwesomeCss, "all.min.css"),
);
cpSync(
  join(fontAwesomeRoot, "webfonts"),
  join(dirname(fontAwesomeCss), "webfonts"),
  { recursive: true, force: true },
);
cpSync(
  join(fontAwesomeRoot, "LICENSE.txt"),
  join(dirname(fontAwesomeCss), "LICENSE.txt"),
);
cpSync(assetsRoot, join(webRoot, "assets"), {
  recursive: true,
  force: true,
});
