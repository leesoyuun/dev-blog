import { describe, expect, it } from "vitest";
import { getPost, resolveLineBreaks } from "../get-posts";

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

  it("should convert <br> tags to markdown hard line breaks when the post contains raw HTML", () => {
    expect(resolveLineBreaks("첫 줄<br>둘째 줄")).toBe("첫 줄  \n둘째 줄");
    expect(resolveLineBreaks("첫 줄<br/>둘째 줄")).toBe("첫 줄  \n둘째 줄");
    expect(resolveLineBreaks("<br />로 시작")).toBe("  \n로 시작");
  });
});
