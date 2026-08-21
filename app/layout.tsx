import type { Metadata } from "next";
import { Black_Ops_One, Archivo } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getBranding, getNavItems, getSiteSettings } from "@/lib/cms/content";
import "./globals.css";

/* Confirmed brand display face — also what the Squarespace template used, and
   almost certainly what the logo wordmark was set in. One weight only. */
const blackOps = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, branding] = await Promise.all([getSiteSettings(), getBranding()]);
  const title = settings?.metaTitle ?? "Boots On Ground Inc | Everyone deserves a hot meal";
  const description =
    settings?.metaDescription ??
    "Free hot breakfast every Saturday at 8AM, 149th St & 3rd Ave in the South Bronx. Coats, clothing, and a way through. No questions asked.";
  const ogImageUrl = branding?.ogImage?.url;
  return {
    metadataBase: new URL("https://bootsongroundnyc.vercel.app"),
    title: { default: title, template: "%s · Boots On Ground Inc" },
    description,
    openGraph: {
      title: branding?.ogTitle ?? title,
      description: branding?.ogDescription ?? description,
      type: "website",
      locale: "en_US",
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, navItems] = await Promise.all([getSiteSettings(), getNavItems()]);
  return (
    <html lang="en" className={`${blackOps.variable} ${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader
          links={navItems.map((n) => ({ to: n.path, label: n.label }))}
          cta={settings?.navCta}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
