import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { getAboutPage } from "@/lib/cms/content";
import { imagePosition } from "@/lib/cms/sdk";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return {
    title: page?.metaTitle ?? "Our Story",
    description: page?.metaDescription,
  };
}

export default async function About() {
  const page = await getAboutPage();

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? ""}
        title={page?.heroTitle ?? ""}
        intro={page?.heroIntro ?? ""}
      />

      <section className="border-b-2 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-2">
          <div className="border-b-2 border-ink p-8 md:border-b-0 md:border-r-2 md:p-14">
            <h2 className="text-4xl md:text-5xl">{page?.storyHeading}</h2>
            {(page?.storyParagraphs ?? []).map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} text-ink/75`}>
                {p}
              </p>
            ))}
            {page?.storyQuote && (
              <blockquote className="mt-8 border-l-4 border-sun pl-5 text-lg italic text-ink/85">
                &ldquo;{page.storyQuote}&rdquo;
              </blockquote>
            )}
            {page?.storyClosing && <p className="mt-6 text-ink/75">{page.storyClosing}</p>}
          </div>
          <div className="relative min-h-[320px]">
            {page?.storyImage?.url && (
              <Image
                src={page.storyImage.url}
                alt={page.storyImage.alt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: imagePosition(page.storyImage) }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-sun">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="text-5xl md:text-7xl">{page?.valuesHeading}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {(page?.values ?? []).map((v, i) => (
              <Reveal key={v.title} delay={i * 110} from="up">
                <div className="h-full border-2 border-ink bg-cream p-6">
                  <h3 className="text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm text-ink/70">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <h2 className="text-5xl md:text-6xl">{page?.timelineHeading}</h2>
            <ul className="mt-10 space-y-8">
              {(page?.timeline ?? []).map((t, i) => (
                <Reveal
                  as="li"
                  key={`${t.year}-${t.title}`}
                  delay={i * 90}
                  from="left"
                  className="border-l-2 border-ink pl-6"
                >
                  <p className="font-display text-4xl">{t.year}</p>
                  <p className="mt-1 font-semibold">{t.title}</p>
                  <p className="mt-1 text-sm text-ink/70">{t.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[400px] border-2 border-ink">
            {page?.timelineImage?.url && (
              <Image
                src={page.timelineImage.url}
                alt={page.timelineImage.alt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: imagePosition(page.timelineImage) }}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
