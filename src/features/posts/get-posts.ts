import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
};

const POSTS_DIR = path.join(process.cwd(), "contents/posts");

function parsePost(data: Record<string, unknown>, slug: string): Post {
  if (typeof data.title !== "string") throw new Error(`Post "${slug}": title 필드가 없습니다`);
  if (typeof data.description !== "string") throw new Error(`Post "${slug}": description 필드가 없습니다`);
  if (!data.date) throw new Error(`Post "${slug}": date 필드가 없습니다`);

  // gray-matter는 YAML 날짜를 Date 객체로 파싱함 — 문자열로 변환
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);

  return {
    slug,
    title: data.title,
    description: data.description,
    date,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
    thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : undefined,
  };
}

export function getPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.(md|mdx)$/.test(f));

  return files
    .map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return parsePost(data as Record<string, unknown>, slug);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
