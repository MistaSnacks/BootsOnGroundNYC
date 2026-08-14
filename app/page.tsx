import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal, Parallax, CountUp } from "@/components/motion";

const stats = [
  { value: "200–300", label: "Breakfasts every Saturday" },
  { value: "1,141", label: "Served and counting" },
  { value: "118", label: "Saturdays run" },
  { value: "Zero", label: "Saturdays missed" },
];

const pillars = [
  {
    n: "01",
    title: "Saturday Breakfast",
    body: "A full hot meal, buffet style, every Saturday at 8AM. Two to three hundred people. It never asks for paperwork before it asks your name.",
    img: "/photos/food-distribution.jpg",
    alt: "Volunteers serving hot food at a community breakfast",
  },
  {
    n: "02",
    title: "Coats & Essentials",
    body: "Clothing, shoes, coats and hygiene laid out on the same table as the food. Take what you need. Nobody is checking.",
    img: "/photos/meeting.jpg",
    alt: "Clothing and essentials laid out for neighbors",
  },
  {
    n: "03",
    title: "A Way Through",
    body: "Referrals and a walk-alongside for treatment, housing and employment — from someone who has actually made that walk herself.",
    img: "/photos/rally.jpg",
    alt: "Community members gathered together in the Bronx",
  },
];

const marquee = [
  "Love In Action",
  "By Us For Us",
  "Free Cups Of Love",
  "Everyone Eats",
  "Rain Hail Sleet Or Snow",
  "The Bronx",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b-2 border-ink bg-sun">
        <div className="mx-auto grid max-w-7xl items-stretch gap-0 md:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-16 md:px-8 md:py-24">
            <Reveal as="span" className="eyebrow block">
              Mott Haven · South Bronx · Every Saturday
            </Reveal>
            <h1 className="mt-6 text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95]">
              {["Everyone", "Deserves", "A Hot Meal"].map((w, i) => (
                <Reveal key={w} as="span" className="block" delay={100 + i * 110} from="left">
                  {w}
                </Reveal>
              ))}
            </h1>
            <Reveal delay={520} className="mt-6 max-w-md text-lg font-semibold text-ink/80">
              8:00 AM at 149th Street and 3rd Avenue, in Roberto Clemente Plaza. Rain, hail, sleet
              or snow. No forms, no questions, no proof of anything.
            </Reveal>
            <Reveal delay={640} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="eyebrow group inline-flex items-center gap-2 bg-ink px-7 py-4 text-cream transition-transform hover:-translate-y-1"
              >
                Donate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/get-involved"
                className="eyebrow inline-flex items-center gap-2 border-2 border-ink px-7 py-4 transition-colors hover:bg-ink hover:text-cream"
              >
                Volunteer
              </Link>
            </Reveal>
          </div>
          <Parallax
            speed={0.18}
            className="relative min-h-[380px] border-t-2 border-ink md:min-h-[680px] md:border-l-2 md:border-t-0"
          >
            <Image
              src="/photos/hero-kitchen.jpg"
              alt="Volunteers serving hot breakfast to neighbors"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Parallax>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b-2 border-ink bg-ink py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-10" aria-hidden={dup === 1}>
              {marquee.map((w) => (
                <span
                  key={w}
                  className="font-display text-4xl uppercase tracking-wide text-sun md:text-5xl"
                >
                  {w} <span className="text-cream/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 120}
              from="scale"
              className="border-b-2 border-r-2 border-ink px-5 py-10 last:border-r-0 md:border-b-0 md:px-8 md:py-14"
            >
              <CountUp value={s.value} className="font-display text-5xl leading-none md:text-6xl" />
              <p className="eyebrow mt-3 text-ink/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <Reveal from="left" className="md:col-span-4">
            <p className="eyebrow">Who we are</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-8">
            <h2 className="text-4xl md:text-6xl">
              We don&apos;t parachute in. She already lived it.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-ink/75">
              Boots On Ground was started by Madeline &ldquo;Maddie&rdquo; Marinez — Bronx-born,
              Dominican American, a diesel mechanic on the Quick Response Team in Afghanistan. A
              teen mom, then a single mom. Fourteen years in active addiction and years across the
              NYC shelter system.
            </p>
            <p className="mt-4 max-w-2xl text-lg text-ink/75">
              She has been in recovery since July 2024. She started this with hot oatmeal and
              croissants pushed in a shopping cart, because she knew exactly what it felt like to
              need it.
            </p>
            <Link
              href="/about"
              className="eyebrow group mt-8 inline-flex items-center gap-2 border-b-2 border-ink pb-1"
            >
              Her whole story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b-2 border-ink bg-sun">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal as="span" className="block">
            <h2 className="text-5xl md:text-7xl">What we do</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 140} from="up" className="flex">
                <Link
                  href="/programs"
                  className="tilt-card group flex flex-1 flex-col border-2 border-ink bg-cream"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-0 top-0 bg-ink px-3 py-1 text-lg font-extrabold tracking-wide text-sun">
                      {p.n}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-3xl">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm text-ink/70">{p.body}</p>
                    <span className="eyebrow mt-6 inline-flex items-center gap-2">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-b-2 border-ink bg-ink text-cream">
        <Reveal from="scale" className="mx-auto max-w-5xl px-5 py-24 text-center md:px-8 md:py-32">
          <p className="font-display text-4xl uppercase leading-tight text-sun md:text-6xl">
            &ldquo;She&apos;s not waiting for institutions to catch up.&rdquo;
          </p>
          <p className="eyebrow mt-8 text-cream/60">Calyx Development Consulting</p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-sun">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8 md:py-24">
          <Reveal from="left">
            <h2 className="max-w-2xl text-5xl md:text-7xl">Put your boots on the ground.</h2>
          </Reveal>
          <Reveal from="right" delay={120} className="flex flex-wrap gap-3">
            <Link
              href="/get-involved"
              className="eyebrow bg-ink px-7 py-4 text-cream transition-transform hover:-translate-y-1"
            >
              Volunteer Saturday
            </Link>
            <Link
              href="/donate"
              className="eyebrow border-2 border-ink px-7 py-4 transition-colors hover:bg-ink hover:text-cream"
            >
              Give Monthly
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
