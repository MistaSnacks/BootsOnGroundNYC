import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal, Parallax } from "@/components/motion";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Saturday breakfast at 8AM, 149th & 3rd. Coats, clothing and hygiene on the same table. Referrals for treatment, housing and employment.",
};

const programs = [
  {
    n: "01",
    title: "Saturday Breakfast",
    img: "/photos/food-distribution.jpg",
    alt: "Hot food being served at a community breakfast",
    body: "Every Saturday at 8:00 AM at 149th Street and 3rd Avenue, in Roberto Clemente Plaza. A full hot meal served buffet style to two or three hundred people. It started as hot oatmeal and croissants in a shopping cart. No ID, no income check, no questions.",
    points: [
      "Saturdays, 8:00 AM sharp",
      "149th & 3rd — Roberto Clemente Plaza",
      "200–300 served, rain, hail, sleet or snow",
    ],
  },
  {
    n: "02",
    title: "Coats & Essentials",
    img: "/photos/meeting.jpg",
    alt: "Clothing and supplies laid out for neighbors",
    body: "Clothing, shoes, coats and hygiene supplies go out on the same tables as the food, so nobody has to join a second line or explain themselves twice. Seasonal drives run through the winter.",
    points: ["Coats, boots and thermals", "Hygiene kits", "Gently used clothing drives"],
  },
  {
    n: "03",
    title: "A Way Through",
    img: "/photos/rally.jpg",
    alt: "Neighbors talking together at a community event",
    body: "If you want help getting into treatment, housing or work, ask — and you get walked there by someone who has made that walk herself. Harm reduction partners are part of the Saturday table, not a separate appointment.",
    points: [
      "Substance use treatment referrals",
      "Housing and shelter navigation",
      "Employment connections",
    ],
  },
];

export default function Programs() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="A hot meal first. Then whatever else you need."
        intro="One table, three things happening at once: food, essentials, and a real route out if you want one."
      />

      <div className="relative">
        {programs.map((p, i) => (
          <section
            key={p.n}
            style={{ zIndex: i + 1 }}
            className={`sticky top-14 md:top-[68px] border-y-2 border-ink shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.55)] ${
              i % 2 === 1 ? "bg-sun" : "bg-cream"
            }`}
          >
            <div
              className={`mx-auto grid max-w-7xl md:min-h-[86vh] md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <Parallax
                speed={0.12}
                className="relative min-h-[320px] border-b-2 border-ink md:border-b-0"
              >
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </Parallax>
              <Reveal
                from={i % 2 === 1 ? "left" : "right"}
                className="flex flex-col justify-center p-8 md:p-14"
              >
                <p className="eyebrow text-ink/50">{p.n}</p>
                <h2 className="mt-3 text-4xl md:text-6xl">{p.title}</h2>
                <p className="mt-5 text-ink/75">{p.body}</p>
                <ul className="mt-6 space-y-2">
                  {p.points.map((pt, j) => (
                    <Reveal
                      as="li"
                      key={pt}
                      delay={120 + j * 100}
                      from="left"
                      className="flex gap-3 border-b border-ink/15 pb-2 text-sm font-semibold"
                    >
                      <span className="text-ink/40">→</span>
                      {pt}
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section className="relative z-10 border-t-2 border-ink bg-sun shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.55)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8">
          <h2 className="text-4xl md:text-6xl">Need help, or want to help?</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="eyebrow border-2 border-ink px-7 py-4 hover:bg-ink hover:text-cream"
            >
              Reach Us
            </Link>
            <Link href="/get-involved" className="eyebrow bg-ink px-7 py-4 text-cream">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
