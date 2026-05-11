"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="읽기 진행률"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed left-0 top-0 z-50 h-[4px] bg-primary transition-[width] duration-150"
      style={{ width: `${progress}%` }}
    />
  );
}
