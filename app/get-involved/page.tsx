import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Set-up is 7:15, serving is 8:00. Wear something you don't mind getting food on. That's the whole orientation.",
};

const ways = [
  {
    t: "Saturday Crew",
    time: "7:15 AM",
    d: "Come early to set up tables, trays and coffee urns, or at 8:00 to serve. Wear something you don't mind getting food on. That's the whole orientation.",
  },
  {
    t: "Bring Supplies",
    time: "Any week",
    d: "Coats, clothing, shoes and hygiene. Check what's actually needed this week before you go shopping — the list changes with the weather.",
  },
  {
    t: "Run a Drive",
    time: "Seasonal",
    d: "Coat drives, clothing drives, gently-used goods. Schools, offices and congregations collect, we distribute.",
  },
  {
    t: "Sponsor a Saturday",
    time: "Per morning",
    d: "Cover the food cost for one full Saturday morning. Businesses, block associations and congregations.",
  },
  {
    t: "Skills Donation",
    time: "Flexible",
    d: "Photography, design, grant writing, legal, a van and a license. If you have it and we need it, we'll use it.",
  },
  {
    t: "Partner With Us",
    time: "Orgs",
    d: "Harm reduction, treatment providers, housing groups and food suppliers who want to plug into an existing Saturday.",
  },
];

export default function GetInvolved() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Show up. That's the whole ask."
        intro="No application, no interview, no minimum commitment. Turn up on a Saturday and you're on the crew."
      />

      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {ways.map((w) => (
            <div
              key={w.t}
              className="group border-b-2 border-ink p-8 transition-colors hover:bg-sun max-md:last:border-b-0 md:border-r-2 md:p-10 md:[&:nth-child(3n)]:border-r-0 md:[&:nth-child(n+4)]:border-b-0"
            >
              <p className="eyebrow text-ink/50">{w.time}</p>
              <h2 className="mt-3 text-3xl md:text-4xl">{w.t}</h2>
              <p className="mt-4 text-sm text-ink/70">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-ink bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <h2 className="text-5xl text-sun md:text-7xl">How a first Saturday goes</h2>
          <ol className="space-y-6">
            {[
              "Message us on Instagram, or just turn up at 149th and 3rd.",
              "Get there at 7:15 for set-up, or 8:00 to serve the line.",
              "You're paired with a regular for the whole morning.",
              "You eat with everyone else when the line is done.",
            ].map((s, i) => (
              <li key={s} className="flex gap-5 border-b border-cream/15 pb-5">
                <span className="font-display text-4xl text-sun">0{i + 1}</span>
                <span className="pt-1 text-cream/80">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sun">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8">
          <h2 className="max-w-xl text-4xl md:text-6xl">Pick a Saturday. We&apos;ll handle the rest.</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="eyebrow bg-ink px-7 py-4 text-cream transition-transform hover:-translate-y-1"
            >
              Sign Up
            </Link>
            <Link
              href="/donate"
              className="eyebrow border-2 border-ink px-7 py-4 hover:bg-ink hover:text-cream"
            >
              Donate Instead
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
