import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal, Parallax } from "@/components/motion";
import { getPrograms, getProgramsPage } from "@/lib/cms/content";
import { imagePosition } from "@/lib/cms/sdk";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProgramsPage();
  return {
    title: page?.metaTitle ?? "What We Do",
    description: page?.metaDescription,
  };
}

export default async function Programs() {
  const [page, programs] = await Promise.all([getProgramsPage(), getPrograms()]);

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? ""}
        title={page?.heroTitle ?? ""}
        intro={page?.heroIntro ?? ""}
      />

      <div className="relative">
        {programs.map((p, i) => (
          <section
            key={p._id}
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
                {p.image?.url && (
                  <Image
                    src={p.image.url}
                    alt={p.image.alt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: imagePosition(p.image) }}
                  />
                )}
              </Parallax>
              <Reveal
                from={i % 2 === 1 ? "left" : "right"}
                className="flex flex-col justify-center p-8 md:p-14"
              >
                <p className="eyebrow text-ink/50">{p.number}</p>
                <h2 className="mt-3 text-4xl md:text-6xl">{p.title}</h2>
                <p className="mt-5 text-ink/75">{p.body}</p>
                <ul className="mt-6 space-y-2">
                  {(p.points ?? []).map((pt, j) => (
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
          <h2 className="text-4xl md:text-6xl">{page?.ctaHeading}</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={page?.ctaSecondary?.href ?? "/contact"}
              className="eyebrow border-2 border-ink px-7 py-4 hover:bg-ink hover:text-cream"
            >
              {page?.ctaSecondary?.label ?? "Reach Us"}
            </Link>
            <Link
              href={page?.ctaPrimary?.href ?? "/get-involved"}
              className="eyebrow bg-ink px-7 py-4 text-cream"
            >
              {page?.ctaPrimary?.label ?? "Volunteer"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
