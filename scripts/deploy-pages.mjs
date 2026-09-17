import { writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_PUBLIC_BASE_PATH: "/portfolio-jeferson-cano",
};

const build = spawnSync("npm", ["run", "build"], { stdio: "inherit", env, shell: true });
if (build.status !== 0) process.exit(build.status ?? 1);

// GitHub Pages ignora "_next" sin este archivo.
writeFileSync("out/.nojekyll", "");

const publish = spawnSync(
  "npx",
  ["--yes", "gh-pages", "-d", "out", "-b", "gh-pages", "-t", "-m", "Deploy portfolio"],
  { stdio: "inherit", shell: true },
);

process.exit(publish.status ?? 1);
