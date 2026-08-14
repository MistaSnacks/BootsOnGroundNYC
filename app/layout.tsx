import type { Metadata } from "next";
import { Black_Ops_One, Archivo } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://bootsongroundnyc.vercel.app"),
  title: {
    default: "Boots On Ground Inc — Everyone deserves a hot meal",
    template: "%s · Boots On Ground Inc",
  },
  description:
    "Free hot breakfast every Saturday at 8AM, 149th St & 3rd Ave in the South Bronx. Coats, clothing, and a way through. No questions asked.",
  openGraph: {
    title: "Boots On Ground Inc — Everyone deserves a hot meal",
    description:
      "Every Saturday, 8AM, 149th & 3rd. Rain, hail, sleet or snow. A South Bronx community outreach organization. By Us for Us.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${blackOps.variable} ${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
