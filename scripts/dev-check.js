#!/usr/bin/env node
// Simple Node version gate for dev: ensures Node >= 18 before running Vite
const semver = process.versions.node.split(".").map(Number);
const [major] = semver;
if (major < 18) {
  console.error(
    `\n[dev-check] Node ${process.versions.node} detectado. Este proyecto requiere Node >= 18 para ejecutar Vite.\n` +
      `\nSolución rápida (bash):\n` +
      `  export NVM_DIR=\"$HOME/.nvm\" && [ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\" && nvm install 18 && nvm use 18\n` +
      `  node -v && npm -v\n` +
      `  npm run dev\n` +
      `\nConsejo: establece Node 18 como predeterminado:\n` +
      `  nvm alias default 18\n`
  );
  process.exit(1);
}
// If OK, just exit successfully so the package script can continue to run Vite
process.exit(0);
