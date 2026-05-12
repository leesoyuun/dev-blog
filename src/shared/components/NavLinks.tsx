"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/posts", label: "포스트" },
  { href: "/series", label: "시리즈" },
  { href: "/about", label: "소개" },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex" aria-label="주요 내비게이션">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-sm font-bold transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
