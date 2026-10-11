import Link from "next/link";
import type { SiteSettings } from "@/lib/cms/content";

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const links = settings?.footerLinks ?? [];
  return (
    <footer className="border-t-2 border-ink bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="col-span-2">
          <p className="font-display text-4xl uppercase leading-none md:text-6xl">
            {settings?.footerWordmark ?? "Boots on Ground"}
          </p>
          <p className="mt-4 max-w-sm text-sm text-cream/70">
            {settings?.footerTagline}{" "}
            {settings?.footerTaglineAccent && (
              <span className="font-semibold text-sun">{settings.footerTaglineAccent}</span>
            )}
          </p>
        </div>
        <div>
          <h4 className="eyebrow text-sun">{settings?.footerScheduleTitle ?? "Saturdays"}</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {(settings?.footerScheduleLines ?? []).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow text-sun">{settings?.footerExploreTitle ?? "Explore"}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href ?? "/"} className="hover:text-sun">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15 px-5 py-6 text-xs leading-relaxed text-cream/50 md:px-8">
        Site by McMathematics · Powered by{" "}
        <a href="https://snackboxcms.com" target="_blank" rel="noopener" className="hover:text-sun">SnackBox</a>
      </div>
    </footer>
  );
}
