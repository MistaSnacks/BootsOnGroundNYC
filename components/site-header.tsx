"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader({
  links,
  cta,
}: {
  links: { to: string; label: string }[];
  cta?: { label?: string; href?: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ctaLabel = cta?.label ?? "Donate";
  const ctaHref = cta?.href ?? "/donate";

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-sun">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="font-display text-3xl leading-none tracking-tight md:text-4xl">
          Boots<span className="text-ink/50">/</span>on<span className="text-ink/50">/</span>Ground
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={`eyebrow border-b-2 pb-1 transition-colors hover:border-ink ${
                pathname === l.to ? "border-ink" : "border-transparent"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            className="eyebrow bg-ink px-5 py-3 text-cream transition-transform hover:-translate-y-0.5"
          >
            {ctaLabel}
          </Link>
        </nav>

        <button
          className="-m-3 p-3 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-t-2 border-ink md:hidden">
          {[...links, { to: ctaHref, label: ctaLabel }].map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className="border-b border-ink/20 px-5 py-4 text-xl font-extrabold uppercase tracking-tight"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
