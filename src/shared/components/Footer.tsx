import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/posts", label: "포스트" },
  { href: "/tags", label: "태그" },
  { href: "/about", label: "소개" },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/50 bg-surface-container-low">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-lg font-black tracking-tight text-foreground">
            leesoyuun<span className="text-primary">.</span>
          </p>
          <nav className="flex gap-6" aria-label="푸터 내비게이션">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 leesoyuun. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
