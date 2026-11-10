import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, relative, dirname, extname, sep } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules"]);
const htmlFiles = [];
const jsFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(resolve(dir, entry.name));
      continue;
    }
    if (!entry.isFile()) continue;
    const file = resolve(dir, entry.name);
    if (extname(file).toLowerCase() === ".html") htmlFiles.push(file);
    if (extname(file).toLowerCase() === ".js") jsFiles.push(file);
  }
}

walk(root);

const missing = [];
const checkedRefs = [];
const refPattern = /(?:href|src)\\s*=\\s*(["'])(.*?)\\1/gi;
for (const file of htmlFiles) {
  const source = readFileSync(file, "utf8");
  let match;
  while ((match = refPattern.exec(source))) {
    const raw = match[2].trim();
    if (!raw || raw.startsWith("#") || raw.startsWith("?") ||
        /^(?:https?:|data:|mailto:|tel:|javascript:|blob:|\\/\\/)/i.test(raw) ||
        raw.includes("${") || raw.includes("{{")) continue;

    let pathname;
    try {
      pathname = decodeURIComponent(raw.split(/[?#]/, 1)[0]);
    } catch {
      missing.push({ file: relative(root, file), ref: raw, reason: "invalid URL encoding" });
      continue;
    }
    if (!pathname) continue;

    const target = pathname.startsWith("/")
      ? resolve(root, "." + pathname)
      : resolve(dirname(file), pathname);
    const relTarget = relative(root, target);
    if (relTarget === ".." || relTarget.startsWith(".." + sep)) {
      missing.push({ file: relative(root, file), ref: raw, reason: "path escapes repository" });
      continue;
    }
    checkedRefs.push({ file, target });
    if (!existsSync(target)) {
      missing.push({ file: relative(root, file), ref: raw, reason: "target does not exist" });
    }
  }
}

const syntaxFailures = [];
for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ["--check", "--input-type=module"], {
    input: readFileSync(file, "utf8"),
    encoding: "utf8"
  });
  if (result.status !== 0) {
    syntaxFailures.push({
      file: relative(root, file),
      output: (result.stderr || result.stdout || "JavaScript syntax check failed").trim()
    });
  }
}

console.log(`Scanned ${htmlFiles.length} HTML files and ${jsFiles.length} JavaScript files.`);
console.log(`Checked ${checkedRefs.length} local href/src references.`);

if (missing.length || syntaxFailures.length) {
  if (missing.length) {
    console.error("\\nBroken or unsafe local references:");
    for (const item of missing) console.error(`- ${item.file}: ${item.ref} (${item.reason})`);
  }
  if (syntaxFailures.length) {
    console.error("\\nJavaScript syntax failures:");
    for (const item of syntaxFailures) console.error(`- ${item.file}\\n${item.output}`);
  }
  process.exitCode = 1;
} else {
  console.log("PASS: local references resolve and standalone JavaScript files parse.");
}
