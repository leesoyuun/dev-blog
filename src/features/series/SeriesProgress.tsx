"use client";

import { useState, useEffect } from "react";
import { useReaderId } from "@/shared/hooks/use-reader-id";

type Props = {
  seriesSlug: string;
  postSlugs: string[];
};

export function SeriesProgress({ seriesSlug, postSlugs }: Props) {
  const readerId = useReaderId();
  const [readCount, setReadCount] = useState(0);

  useEffect(() => {
    if (!readerId) return;
    const query = new URLSearchParams({
      readerId,
      posts: postSlugs.join(","),
    });
    fetch(`/api/progress?${query}`)
      .then((r) => r.json())
      .then((data) => setReadCount((data.read as string[]).length));
  }, [readerId, seriesSlug, postSlugs]);

  const total = postSlugs.length;
  const percent = total > 0 ? Math.round((readCount / total) * 100) : 0;

  return (
    <div className="rounded-lg border border-border/60 p-5">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Series Progress
      </p>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Completed</span>
        <span className="text-sm font-bold text-primary">{percent}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-1.5 rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-3 text-xs italic text-muted-foreground">
        {percent === 0
          ? "Start reading to track your progress through this series."
          : percent === 100
            ? "You've completed this series!"
            : `${readCount} of ${total} posts read.`}
      </p>
    </div>
  );
}
