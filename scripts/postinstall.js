"use strict";

/**
 * postinstall.js
 *
 * Patches testem to work with execa 5 (CJS) instead of execa 9 (ESM-only).
 * testem 3.20.1 declares execa ^9.6.1 but uses require() which is incompatible
 * with ESM-only packages. This script replaces the nested execa 9 with a
 * symlink to the top-level execa 5, and patches the three testem files that
 * use require('execa').execa to be compatible with execa 5's API.
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const testemExecaPath = path.join(
  root,
  "node_modules/testem/node_modules/execa"
);
const topLevelExecaPath = path.join(root, "node_modules/execa");

// Replace nested execa 9 with symlink to top-level execa 5
try {
  fs.rmSync(testemExecaPath, { recursive: true, force: true });
} catch (e) {
  // ignore
}
try {
  fs.symlinkSync(topLevelExecaPath, testemExecaPath);
  console.log("[postinstall] Symlinked testem/node_modules/execa -> execa@5");
} catch (e) {
  console.warn("[postinstall] Could not symlink execa:", e.message);
}

// Patch testem files that use require('execa').execa (execa 9 API)
// to work with execa 5 where the default export IS the function
const OLD = "const execa = require('execa').execa;";
const NEW = "const _em = require('execa'); const execa = _em.execa || _em;";

const filesToPatch = [
  path.join(root, "node_modules/testem/lib/utils/fileutils.js"),
  path.join(root, "node_modules/testem/lib/process-ctl.js"),
  path.join(root, "node_modules/testem/lib/utils/process.js"),
];

for (const filePath of filesToPatch) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    if (content.includes(OLD)) {
      fs.writeFileSync(filePath, content.replace(OLD, NEW));
      console.log("[postinstall] Patched", path.relative(root, filePath));
    }
  } catch (e) {
    console.warn("[postinstall] Could not patch", filePath, ":", e.message);
  }
}
