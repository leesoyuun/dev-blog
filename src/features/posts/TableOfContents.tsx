"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";
import type { Heading } from "./get-posts";

type Props = { headings: Heading[] };

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (headings.length === 0) return;

    function onScroll() {
      const scrollY = window.scrollY + 96; // sticky header offset
      let currentId = headings.at(0)?.id ?? "";
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) currentId = id;
      }
      setActiveId(currentId);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="목차">
      <p className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
        Outline
      </p>
      <ul className="space-y-4 border-l border-border">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.scrollY - 96;
                window.scrollTo({ top, behavior: "smooth" });
              }}
              className={cn(
                "block cursor-pointer py-0.5 text-sm leading-snug transition-colors",
                level === 3 ? "pl-8" : "pl-4",
                activeId === id
                  ? "-ml-px border-l-2 border-primary font-bold text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
