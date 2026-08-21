import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { MediaGallery } from "@/components/media-gallery";
import { getMediaItems, getMediaPage } from "@/lib/cms/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMediaPage();
  return {
    title: page?.metaTitle ?? "Media",
    description: page?.metaDescription,
  };
}

export default async function Media() {
  const [page, items] = await Promise.all([getMediaPage(), getMediaItems()]);
  const credit = page?.credit;

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? ""}
        title={page?.heroTitle ?? ""}
        intro={page?.heroIntro ?? ""}
      />

      {credit?.linkLabel && (
        <div className="border-b-2 border-ink bg-ink py-4 text-cream">
          <p className="eyebrow mx-auto max-w-7xl px-5 text-cream/70 md:px-8">
            {credit.text}{" "}
            <a
              href={credit.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b-2 border-sun pb-0.5 text-sun transition-colors hover:bg-sun hover:text-ink"
            >
              {credit.linkLabel}
            </a>
          </p>
        </div>
      )}

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <MediaGallery items={items} />
        </div>
      </section>
    </>
  );
}
