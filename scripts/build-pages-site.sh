#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE="$ROOT/_site"

rm -rf "$SITE"
mkdir -p "$SITE"
touch "$SITE/.nojekyll"

cp -r "$ROOT/preview" "$SITE/"

for dir in preview-2 preview-3 preview-3b preview-3c preview-4a preview-5a preview-5b preview-5d; do
  if [ -d "$ROOT/$dir/dist" ]; then
    mkdir -p "$SITE/$dir"
    cp -r "$ROOT/$dir/dist" "$SITE/$dir/"
  fi
done

if [ -f "$ROOT/PREVIEW-LINKS.md" ]; then
  cp "$ROOT/PREVIEW-LINKS.md" "$SITE/"
fi

echo "Pages site ready at _site ($(find "$SITE" -type f | wc -l) files)"
