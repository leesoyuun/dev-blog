#!/usr/bin/env bash
set -euo pipefail

if [ -z "${SUBMODULE_PAT:-}" ]; then
  echo "SUBMODULE_PAT env var is not set — Vercel Project Settings > Environment Variables에 등록 필요 (contents 서브모듈은 private repo)." >&2
  exit 1
fi

git config --global url."https://${SUBMODULE_PAT}@github.com/".insteadOf "https://github.com/"
git submodule update --init --recursive
