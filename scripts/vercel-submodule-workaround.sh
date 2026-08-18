#!/usr/bin/env bash
set -euo pipefail

if [ -z "${SUBMODULE_PAT:-}" ]; then
  echo "SUBMODULE_PAT env var is not set" >&2
  exit 1
fi

git config --global \
  url."https://leesoyuun:${SUBMODULE_PAT}@github.com/".insteadOf \
  "https://github.com/"

git submodule update --init --recursive