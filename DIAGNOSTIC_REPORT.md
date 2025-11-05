# Diagnostic Report: Git push and Dev Server

Date: 2025-11-05
Branch: `diagnostic/git-dev-fix-20251105-1200`

This report documents the diagnostics performed to address:
- Git pushes not reflecting commits on GitHub
- `npm run dev` not serving the app locally

All commands executed were non-destructive. No credentials or tokens were recorded.

## Git diagnostics

### A) Repo state

Command: `git status --porcelain --branch`

```
## diagnostic/git-dev-fix-20251105-1200
 M src/lib/calculators/index.ts
 M src/pages/tools/Clinicos.tsx
```

Command: `git rev-parse --abbrev-ref HEAD`

```
diagnostic/git-dev-fix-20251105-1200
```

Command: `git remote -v`

```
origin  https://github.com/JoasSVega/fyt-lab-connect.git (fetch)
origin  https://github.com/JoasSVega/fyt-lab-connect.git (push)
```

Command: `git log --oneline -n 5`

```
01bebf5 (HEAD -> diagnostic/git-dev-fix-20251105-1200, origin/feature/unified-calculator-modal, feature/unified-calculator-modal) fix(calculators): re-export pharma adapters from TSX to resolve missing export during build
348a387 feat(calculators): add hepatic function to unified modal (Child-Pugh, MELD/MELD-Na, APRI, FIB-4) via registry+adapters; wire Clinicos page
f57d716 feat(calculators): migrate anthropometric calculators (Body Fat, BMR, Ideal Weight, ACT, MMC) to unified CalculatorModal via registry+adapters; update page wiring
b46d27c test(calculators): remove redundant CalculationResult cast/import in CalculatorModal test
0503d0f fix(calculators): remove remaining any casts in CalculatorModal to satisfy ESLint no-explicit-any; lint clean and tests passing
```

### B) Config and authentication

Command: `git config --list --show-origin` (excerpt)

```
file:/home/odin/.gitconfig      user.name=Joás Vega
file:/home/odin/.gitconfig      user.email=joas.vega@ejemplo.om
file:.git/config        remote.origin.url=https://github.com/JoasSVega/fyt-lab-connect.git
file:.git/config        remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
file:.git/config        branch.main.remote=origin
file:.git/config        branch.main.merge=refs/heads/main
file:.git/config        branch.feature/unified-calculator-modal.remote=origin
file:.git/config        branch.feature/unified-calculator-modal.merge=refs/heads/feature/unified-calculator-modal
```

- Remote protocol: HTTPS
- Credential helper: not set (`git config credential.helper` returned empty)

SSH test was not applicable because the remote uses HTTPS. If using SSH locally, test with `ssh -T git@github.com` and ensure keys are loaded in your agent.

For HTTPS remotes, ensure your credential manager (e.g., `git-credential-manager` on Linux) or GitHub CLI/PAT is configured. Do not store tokens in this repo.

### C) Hooks/policies that could block push

Command: `ls -la .git/hooks`

```
... pre-push.sample (and other *.sample hooks)
```

Command: `ls -la .husky`

```
no .husky dir
```

- No active Git hooks detected (only sample hooks present).
- No Husky directory found. No pre-push hooks blocking pushes in this repo.

### D) Remote branches and upstream

Command: `git branch -vv`

```
* diagnostic/git-dev-fix-20251105-1200 01bebf5 fix(calculators): re-export pharma adapters from TSX to resolve missing export during build
  feature/unified-calculator-modal     01bebf5 [origin/feature/unified-calculator-modal] fix(calculators): re-export pharma adapters from TSX to resolve missing export during build
  main                                 ecfb58b [origin/main] fix(lint): remove explicit any in HepaticFunctionCalculator; stabilize antibiotics options with useMemo and correct useEffect deps
```

Command: `git branch -r`

```
  origin/HEAD -> origin/main
  origin/feature/unified-calculator-modal
  origin/feature/unify-calculator-layout
  origin/main
  origin/opt/perf-cleanup
```

Command: `git push -u origin diagnostic/git-dev-fix-20251105-1200`

```
To https://github.com/JoasSVega/fyt-lab-connect.git
 * [new branch]      diagnostic/git-dev-fix-20251105-1200 -> diagnostic/git-dev-fix-20251105-1200
Branch set to track remote branch
```

Result: Push succeeded, confirming remote connectivity and permissions are OK in this environment.

### E) Likely causes and safe actions

- If pushes “don’t show up” on GitHub locally:
  - Confirm you’re on the expected branch: `git rev-parse --abbrev-ref HEAD`.
  - Ensure an upstream is set: `git push -u origin <branch>` (first push only).
  - If the remote is HTTPS and prompts repeatedly, configure a credential helper (e.g., `git-credential-manager`) or use GitHub CLI with a login.
  - If you see “non-fast-forward” errors, do not force-push; run `git pull --rebase` first (confirm before executing).
  - Check you’re not pushing to a fork or a different remote than expected.

No large-file or LFS issues were detected in this run.

## Dev server diagnostics

### A) State collection

Command: `node -v && npm -v` (initial shell)

```
NODE: v12.22.12
NPM: 7.5.2
```

Relevant scripts (from `package.json`):

```
{
  "dev": "vite",
  "build": "vite build && node scripts/postbuild-spa.js && node scripts/inline-css.js",
  "preview": "vite preview"
}
```

Node modules present and size:

```
du -sh node_modules => 1.3G
```

`.env` files: none detected in repo root.

Command: `npm run dev` (8-second timeout to capture startup)

```
VITE v5.4.21 ready
Local:   http://localhost:8080/
Network: http://<local-ip>:8080/
```

Observation: The dev server starts on port 8080 (custom config), not the Vite default 5173.

### B) Actions and recommendations

- Node version: Vite 5 requires Node >= 18. If your local shell uses Node 12/14/16, switch to Node 18 using `nvm use 18` or install it: `nvm install 18`.
- Access the app at: `http://localhost:8080/` (as printed by Vite) — ensure no proxy/VPN or firewall is blocking.
- If accessing from another device, run `npm run dev -- --host` and use the “Network” URL printed by Vite.
- If the server fails to start, reinstall deps cleanly:
  - Delete `node_modules` and lockfile, then `npm ci` (or `npm install` if no lockfile).
- If another process is using the port, Vite will prompt to switch; alternatively check: `lsof -i :8080`.

## Findings summary

- Git: Remote is HTTPS; no active hooks blocking push. Pushing the diagnostic branch succeeded, indicating credentials/connectivity OK here. If your local pushes “don’t appear,” verify branch/upstream and credential helper configuration.
- Dev server: Starts successfully on port 8080. If you don’t see the app in Firefox, confirm the URL/port and Node version (>= 18). Consider `--host` if testing across devices.

## Changes made

- Created diagnostic branch: `diagnostic/git-dev-fix-20251105-1200`.
- Added this report: `DIAGNOSTIC_REPORT.md`.

## Next steps (if issues persist locally)

1) In your terminal session, ensure Node 18:

```
# Load nvm (if not auto-loaded)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18
```

2) Verify remote and upstream, then push:

```
git rev-parse --abbrev-ref HEAD
git push -u origin <your-branch>
```

3) Start the dev server and open the printed URL:

```
npm run dev
# If accessing from other device
npm run dev -- --host
```

If you’d like, I can add a lightweight `scripts/dev-check.sh` to auto-verify Node version and hint when not on 18.
