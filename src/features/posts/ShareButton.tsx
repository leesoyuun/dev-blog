"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={share}
      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      aria-label="글 공유하기"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Share2 className="h-3.5 w-3.5" />
      )}
      {copied ? "링크 복사됨" : "공유"}
    </button>
  );
}
