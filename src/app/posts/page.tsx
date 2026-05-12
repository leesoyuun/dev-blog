import type { Metadata } from "next";
import { getPosts } from "@/features/posts/get-posts";
import { PostCard } from "@/features/posts/PostCard";

export const metadata: Metadata = {
  title: "포스트",
  description: "프론트엔드 개발에 관한 글 모음",
};

export default function PostsPage() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
      <header className="mb-12">
        <h1 className="mb-3 text-4xl font-black leading-[1.1] lg:text-5xl">
          포스트
        </h1>
        <p className="text-muted-foreground">{posts.length}개의 글</p>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
      )}
    </div>
  );
}
