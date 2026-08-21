import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion";
import { getContactPage } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return {
    title: page?.metaTitle ?? "Contact",
    description: page?.metaDescription,
  };
}

export default async function Contact() {
  const page = await getContactPage();

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
            <h2 className="text-4xl md:text-5xl">{page?.saturdayHeading}</h2>
            <dl className="mt-8 space-y-5">
              {(page?.saturdayDetails ?? []).map((d) => (
                <div key={d.label} className="border-b border-ink/15 pb-4">
                  <dt className="eyebrow text-ink/50">{d.label}</dt>
                  <dd className="mt-1 text-lg font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="p-8 md:p-14">
            <h2 className="text-4xl md:text-5xl">{page?.reachHeading}</h2>
            <ul className="mt-8 space-y-5">
              {(page?.reachLinks ?? []).map((l, i) => (
                <Reveal
                  as="li"
                  key={l.label}
                  delay={i * 90}
                  from="left"
                  className="border-b border-ink/15 pb-4"
                >
                  <p className="eyebrow text-ink/50">{l.label}</p>
                  <a href={l.href} className="mt-1 block text-lg font-semibold hover:text-olive">
                    {l.value}
                  </a>
                </Reveal>
              ))}
            </ul>

            {page?.goodsNote && (
              <div className="mt-10 border-l-4 border-sun pl-5">
                <p className="text-sm text-ink/70">{page.goodsNote}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="font-display text-4xl uppercase leading-tight text-sun md:text-6xl">
            &ldquo;{page?.quote?.text}&rdquo;
          </p>
          <p className="eyebrow mt-8 text-cream/60">{page?.quote?.attribution}</p>
        </div>
      </section>
    </>
  );
}
