"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex w-full items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground"
    >
      {copied ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
      {copied ? "링크 복사됨!" : "Share this series"}
    </button>
  );
}
