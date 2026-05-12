import Link from "next/link";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { NavLinks } from "@/shared/components/NavLinks";

export function Header() {
  return (
    <header className="glass-nav sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-black tracking-tight text-foreground">
          leesoyuun<span className="text-primary">.</span>
        </Link>
        <NavLinks />
        <ThemeToggle />
      </div>
    </header>
  );
}
