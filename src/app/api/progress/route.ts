import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const readerId = req.nextUrl.searchParams.get("readerId");
  const postsParam = req.nextUrl.searchParams.get("posts");

  if (!readerId || !postsParam) {
    return NextResponse.json({ read: [] });
  }

  const postSlugs = postsParam.split(",");
  const key = `reader:${readerId}:read`;

  try {
    const results = await Promise.all(
      postSlugs.map((slug) => kv.sismember(key, slug))
    );
    const read = postSlugs.filter((_, i) => results[i]);
    return NextResponse.json({ read });
  } catch {
    // KV 미설정(로컬 개발 환경) 시 graceful degradation — 조회수와 동일한 패턴
    return NextResponse.json({ read: [] });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { readerId?: string; postSlug?: string };
  const { readerId, postSlug } = body;

  if (!readerId || !postSlug) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const key = `reader:${readerId}:read`;

  try {
    await kv.sadd(key, postSlug);
    return NextResponse.json({ ok: true });
  } catch {
    // KV 미설정 시 graceful degradation
    return NextResponse.json({ ok: false });
  }
}
