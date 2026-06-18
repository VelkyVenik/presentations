#!/usr/bin/env bash
# Build the publishable site into dist/ for Cloudflare Workers static assets.
# Copies everything EXCEPT source-only material: notes/ (story + structure),
# _template/, docs, and build/config files. dist/ is what Cloudflare serves.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
mkdir dist
rsync -a \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='.DS_Store' \
  --exclude='dist' \
  --exclude='node_modules' \
  --exclude='_template' \
  --exclude='notes' \
  --exclude='wrangler.jsonc' \
  --exclude='wrangler.toml' \
  --exclude='build.sh' \
  --exclude='CLAUDE.md' \
  --exclude='README.md' \
  --exclude='CNAME' \
  ./ dist/

echo "Built dist/ — $(find dist -type f | wc -l | tr -d ' ') files"
