import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { BoldText } from "@/components/bold-text";
import { getDonatePage } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDonatePage();
  return {
    title: page?.metaTitle ?? "Donate",
    description: page?.metaDescription,
  };
}

export default async function Donate() {
  const page = await getDonatePage();

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? ""}
        title={page?.heroTitle ?? ""}
        intro={page?.heroIntro ?? ""}
      />

      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl md:grid-cols-4">
          {(page?.tiers ?? []).map((t, i) => (
            <Reveal
              key={t.amount}
              delay={i * 110}
              from="up"
              className="border-b-2 border-ink p-8 last:border-b-0 md:border-b-0 md:border-r-2 md:p-10 md:last:border-r-0"
            >
              <p className="font-display text-6xl md:text-7xl">{t.amount}</p>
              <p className="mt-4 text-sm text-ink/70">{t.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-ink bg-sun">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="text-4xl md:text-6xl">{page?.howToGiveHeading}</h2>
          <div className="mt-10 flex flex-wrap gap-4">
            {(page?.givingMethods ?? []).map((m, i) => (
              <a
                key={m.label}
                href={m.url}
                className={
                  i === 0
                    ? "eyebrow bg-ink px-7 py-5 text-cream transition-transform hover:-translate-y-1"
                    : "eyebrow border-2 border-ink px-7 py-5 transition-colors hover:bg-ink hover:text-cream"
                }
              >
                {m.label}
              </a>
            ))}
          </div>

          {/* This block is a legal requirement until the determination letter lands. Do not remove. */}
          {(page?.noticeParagraphs?.length ?? 0) > 0 && (
            <div className="mt-12 max-w-3xl border-l-4 border-ink bg-ink/5 p-6">
              <h3 className="text-2xl">{page?.noticeHeading}</h3>
              {(page?.noticeParagraphs ?? []).map((p, i) => (
                <p key={i} className={`${i === 0 ? "mt-4" : "mt-3"} text-ink/80`}>
                  <BoldText text={p} />
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8">
          <h2 className="max-w-xl text-4xl md:text-6xl">{page?.ctaHeading}</h2>
          <Link
            href={page?.ctaButton?.href ?? "/get-involved"}
            className="eyebrow bg-ink px-7 py-4 text-cream transition-transform hover:-translate-y-1"
          >
            {page?.ctaButton?.label ?? "Volunteer"}
          </Link>
        </div>
      </section>
    </>
  );
}
