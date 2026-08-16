#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "contents/posts");
const PUBLIC_POSTS_DIR = path.join(process.cwd(), "public/posts");

function extractImagePaths(content) {
  const paths = new Set();
  const regex = /!\[[^\]]*\]\(([^)\s]+)\)/g;
  let match;
  while ((match = regex.exec(content))) {
    const src = match[1];
    if (/^https?:\/\//.test(src) || src.startsWith("/")) continue;
    paths.add(src);
  }
  return [...paths];
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`contents/posts 디렉토리가 없습니다: ${POSTS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.(md|mdx)$/.test(f));
  let copiedCount = 0;

  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const imagePaths = extractImagePaths(raw);
    if (imagePaths.length === 0) continue;

    const destDir = path.join(PUBLIC_POSTS_DIR, slug);
    fs.mkdirSync(destDir, { recursive: true });

    for (const imagePath of imagePaths) {
      const srcPath = path.join(POSTS_DIR, imagePath);
      if (!fs.existsSync(srcPath)) {
        console.error(`Post "${slug}": 참조된 이미지가 없습니다 — ${imagePath}`);
        process.exit(1);
      }
      fs.copyFileSync(srcPath, path.join(destDir, path.basename(imagePath)));
      copiedCount++;
    }
  }

  console.log(`이미지 ${copiedCount}개를 public/posts/로 복사했습니다.`);
}

main();
