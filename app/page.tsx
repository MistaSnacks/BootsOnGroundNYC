import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal, Parallax, CountUp } from "@/components/motion";
import { getHomePage, getPrograms } from "@/lib/cms/content";
import { imagePosition } from "@/lib/cms/sdk";

export default async function Home() {
  const [home, programs] = await Promise.all([getHomePage(), getPrograms()]);

  return (
    <>
      {/* HERO */}
      <section className="border-b-2 border-ink bg-sun">
        <div className="mx-auto grid max-w-7xl items-stretch gap-0 md:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-16 md:px-8 md:py-24">
            <Reveal as="span" className="eyebrow block">
              {home?.heroEyebrow}
            </Reveal>
            <h1 className="mt-6 text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95]">
              {(home?.heroTitleLines ?? []).map((w, i) => (
                <Reveal key={w} as="span" className="block" delay={100 + i * 110} from="left">
                  {w}
                </Reveal>
              ))}
            </h1>
            <Reveal delay={520} className="mt-6 max-w-md text-lg font-semibold text-ink/80">
              {home?.heroIntro}
            </Reveal>
            <Reveal delay={640} className="mt-8 flex flex-wrap gap-3">
              <Link
                href={home?.heroPrimaryCta?.href ?? "/donate"}
                className="eyebrow group inline-flex items-center gap-2 bg-ink px-7 py-4 text-cream transition-transform hover:-translate-y-1"
              >
                {home?.heroPrimaryCta?.label ?? "Donate"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={home?.heroSecondaryCta?.href ?? "/get-involved"}
                className="eyebrow inline-flex items-center gap-2 border-2 border-ink px-7 py-4 transition-colors hover:bg-ink hover:text-cream"
              >
                {home?.heroSecondaryCta?.label ?? "Volunteer"}
              </Link>
            </Reveal>
          </div>
          <Parallax
            speed={0.18}
            className="relative min-h-[380px] border-t-2 border-ink md:min-h-[680px] md:border-l-2 md:border-t-0"
          >
            {home?.heroImage?.url && (
              <Image
                src={home.heroImage.url}
                alt={home.heroImage.alt ?? ""}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: imagePosition(home.heroImage) }}
              />
            )}
          </Parallax>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b-2 border-ink bg-ink py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-10" aria-hidden={dup === 1}>
              {(home?.marqueeWords ?? []).map((w) => (
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
          {(home?.stats ?? []).map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 120}
              from="scale"
              className="border-ink px-5 py-10 max-md:odd:border-r-2 max-md:[&:nth-child(-n+2)]:border-b-2 md:border-r-2 md:last:border-r-0 md:px-8 md:py-14"
            >
              <CountUp
                value={s.value ?? ""}
                className="font-display text-5xl leading-none md:text-6xl"
              />
              <p className="eyebrow mt-3 text-ink/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <Reveal from="left" className="md:col-span-4">
            <p className="eyebrow">{home?.missionEyebrow}</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-8">
            <h2 className="text-4xl md:text-6xl">{home?.missionHeading}</h2>
            {(home?.missionParagraphs ?? []).map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} max-w-2xl text-lg text-ink/75`}>
                {p}
              </p>
            ))}
            <Link
              href={home?.missionLink?.href ?? "/about"}
              className="eyebrow group mt-8 inline-flex items-center gap-2 border-b-2 border-ink pb-1"
            >
              {home?.missionLink?.label ?? "Her whole story"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b-2 border-ink bg-sun">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal as="span" className="block">
            <h2 className="text-5xl md:text-7xl">{home?.pillarsHeading}</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p._id} delay={i * 140} from="up" className="flex">
                <Link
                  href="/programs"
                  className="tilt-card group flex flex-1 flex-col border-2 border-ink bg-cream"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
                    {p.image?.url && (
                      <Image
                        src={p.image.url}
                        alt={p.image.alt ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ objectPosition: imagePosition(p.image) }}
                      />
                    )}
                    <span className="absolute left-0 top-0 bg-ink px-3 py-1 text-lg font-extrabold tracking-wide text-sun">
                      {p.number}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-3xl">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm text-ink/70">{p.cardSummary}</p>
                    <span className="eyebrow mt-6 inline-flex items-center gap-2">
                      {home?.pillarsLinkLabel ?? "Learn more"}
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
            &ldquo;{home?.quote?.text}&rdquo;
          </p>
          <p className="eyebrow mt-8 text-cream/60">{home?.quote?.attribution}</p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-sun">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8 md:py-24">
          <Reveal from="left">
            <h2 className="max-w-2xl text-5xl md:text-7xl">{home?.ctaHeading}</h2>
          </Reveal>
          <Reveal from="right" delay={120} className="flex flex-wrap gap-3">
            <Link
              href={home?.ctaPrimary?.href ?? "/get-involved"}
              className="eyebrow bg-ink px-7 py-4 text-cream transition-transform hover:-translate-y-1"
            >
              {home?.ctaPrimary?.label ?? "Volunteer Saturday"}
            </Link>
            <Link
              href={home?.ctaSecondary?.href ?? "/donate"}
              className="eyebrow border-2 border-ink px-7 py-4 transition-colors hover:bg-ink hover:text-cream"
            >
              {home?.ctaSecondary?.label ?? "Give Monthly"}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
