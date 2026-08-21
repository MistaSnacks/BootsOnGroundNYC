import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getGetInvolvedPage } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGetInvolvedPage();
  return {
    title: page?.metaTitle ?? "Get Involved",
    description: page?.metaDescription,
  };
}

export default async function GetInvolved() {
  const page = await getGetInvolvedPage();

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? ""}
        title={page?.heroTitle ?? ""}
        intro={page?.heroIntro ?? ""}
      />

      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {(page?.ways ?? []).map((w) => (
            <div
              key={w.title}
              className="group border-b-2 border-ink p-8 transition-colors hover:bg-sun max-md:last:border-b-0 md:border-r-2 md:p-10 md:[&:nth-child(3n)]:border-r-0 md:[&:nth-child(n+4)]:border-b-0"
            >
              <p className="eyebrow text-ink/50">{w.time}</p>
              <h2 className="mt-3 text-3xl md:text-4xl">{w.title}</h2>
              <p className="mt-4 text-sm text-ink/70">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-ink bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <h2 className="text-5xl text-sun md:text-7xl">{page?.firstSaturdayHeading}</h2>
          <ol className="space-y-6">
            {(page?.firstSaturdaySteps ?? []).map((s, i) => (
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
          <h2 className="max-w-xl text-4xl md:text-6xl">{page?.ctaHeading}</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={page?.ctaPrimary?.href ?? "/contact"}
              className="eyebrow bg-ink px-7 py-4 text-cream transition-transform hover:-translate-y-1"
            >
              {page?.ctaPrimary?.label ?? "Sign Up"}
            </Link>
            <Link
              href={page?.ctaSecondary?.href ?? "/donate"}
              className="eyebrow border-2 border-ink px-7 py-4 hover:bg-ink hover:text-cream"
            >
              {page?.ctaSecondary?.label ?? "Donate Instead"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
