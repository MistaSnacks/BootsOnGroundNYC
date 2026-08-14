import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Five dollars can warm a tummy. Boots On Ground is funded entirely by community donations — no institutional or government money.",
};

const tiers = [
  { amt: "$5", d: "Warms a tummy. Their own line, not ours." },
  { amt: "$25", d: "Breakfast for a family of four on a Saturday morning." },
  { amt: "$60", d: "A winter coat and a pair of boots for one person." },
  { amt: "$250", d: "You just bought Saturday — food for the whole morning." },
];

export default function Donate() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Five dollars can warm a tummy"
        intro="Boots On Ground runs on community donations and volunteers. There is no institutional funding and no government money behind this."
      />

      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl md:grid-cols-4">
          {tiers.map((t, i) => (
            <Reveal
              key={t.amt}
              delay={i * 110}
              from="up"
              className="border-b-2 border-ink p-8 last:border-b-0 md:border-b-0 md:border-r-2 md:p-10 md:last:border-r-0"
            >
              <p className="font-display text-6xl md:text-7xl">{t.amt}</p>
              <p className="mt-4 text-sm text-ink/70">{t.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-ink bg-sun">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="text-4xl md:text-6xl">How to give</h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://cash.app/$bootsoginc"
              className="eyebrow bg-ink px-7 py-5 text-cream transition-transform hover:-translate-y-1"
            >
              CashApp · $bootsoginc
            </a>
            <a
              href="https://www.gofundme.com/f/help-maddie-bring-boots-on-ground-to-life"
              className="eyebrow border-2 border-ink px-7 py-5 transition-colors hover:bg-ink hover:text-cream"
            >
              GoFundMe
            </a>
          </div>

          {/* This block is a legal requirement until the determination letter lands. Do not remove. */}
          <div className="mt-12 max-w-3xl border-l-4 border-ink bg-ink/5 p-6">
            <h3 className="text-2xl">Straight with you</h3>
            <p className="mt-4 text-ink/80">
              Boots On Ground Inc is a <strong>New York State not-for-profit corporation</strong>{" "}
              (DOS ID 5949961, incorporated 2021). Our federal 501(c)(3) determination is still{" "}
              <strong>pending</strong>, which means donations are{" "}
              <strong>not tax-deductible at this time</strong>.
            </p>
            <p className="mt-3 text-ink/80">
              Every dollar goes to food, coats and supplies for Saturday morning at 149th and 3rd.
              When the determination letter arrives, this page will say so.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8">
          <h2 className="max-w-xl text-4xl md:text-6xl">Can&apos;t give money? Give a Saturday.</h2>
          <Link
            href="/get-involved"
            className="eyebrow bg-ink px-7 py-4 text-cream transition-transform hover:-translate-y-1"
          >
            Volunteer
          </Link>
        </div>
      </section>
    </>
  );
}
