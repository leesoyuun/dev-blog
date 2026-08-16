import { describe, expect, it } from "vitest";
import { getPost } from "../get-posts";

describe("getPost", () => {
  it("should rewrite relative image paths to /posts/{slug}/ when the post references local images", () => {
    const post = getPost("speedTest");

    expect(post).not.toBeNull();
    expect(post?.content).toContain("(/posts/speedTest/image.png)");
    expect(post?.content).toContain("(/posts/speedTest/image-1.png)");
    expect(post?.content).not.toMatch(/]\(image[-\w]*\.png\)/);
  });

  it("should return null when the slug does not exist", () => {
    expect(getPost("this-slug-does-not-exist")).toBeNull();
  });
});
