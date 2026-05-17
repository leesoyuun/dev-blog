"use client";

import { useEffect } from "react";
import { useReaderId } from "@/shared/hooks/use-reader-id";

type Props = { postSlug: string };

export function MarkAsRead({ postSlug }: Props) {
  const readerId = useReaderId();

  useEffect(() => {
    if (!readerId) return;
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ readerId, postSlug }),
    });
  }, [readerId, postSlug]);

  return null;
}
