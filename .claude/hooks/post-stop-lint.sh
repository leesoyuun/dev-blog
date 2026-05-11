#!/bin/bash
# Run lint once at session end only if files were modified this session.
LINT_FLAG="$CLAUDE_PROJECT_DIR/.claude/.lint-needed"

if [ ! -f "$LINT_FLAG" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0
export PATH="$PATH:$(npm root -g 2>/dev/null)/.bin"

echo "[post-stop] Running lint..."
pnpm lint 2>&1
STATUS=$?

rm -f "$LINT_FLAG"
exit $STATUS
