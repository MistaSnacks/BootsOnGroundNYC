"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { Reveal } from "@/components/motion";
import { imagePosition } from "@/lib/cms/sdk";
import type { MediaItem } from "@/lib/cms/content";

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8">
        {items.map((item, i) => (
          <Reveal key={item._id} delay={(i % 3) * 110} from="up" className="flex">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open ${item.video?.url ? "video" : "photo"}: ${item.caption ?? "media item"}`}
              className="tilt-card group flex flex-1 cursor-pointer flex-col border-2 border-ink bg-cream text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
                {item.image?.url && (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt ?? item.caption ?? ""}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: imagePosition(item.image) }}
                  />
                )}
                {item.video?.url && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center border-2 border-sun bg-ink/80 text-sun transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                  </span>
                )}
                <span className="eyebrow absolute left-0 top-0 bg-ink px-3 py-1 text-sun">
                  {item.video?.url ? "Video" : "Photo"}
                </span>
              </div>
              {item.caption && (
                <span className="eyebrow block p-4 text-ink/70">{item.caption}</span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption ?? "Media viewer"}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 p-4 md:p-8"
          onClick={close}
        >
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="border-2 border-cream/40 p-2 text-cream transition-colors hover:border-sun hover:text-sun"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {active.video?.url ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                key={active._id}
                src={active.video.url}
                poster={active.image?.url ?? undefined}
                controls
                autoPlay
                playsInline
                className="max-h-full max-w-full border-2 border-sun"
              />
            ) : (
              active.image?.url && (
                // Dimensions are unknown at build time, so next/image can't size this.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={active._id}
                  src={active.image.url}
                  alt={active.image.alt ?? active.caption ?? ""}
                  className="max-h-full max-w-full border-2 border-sun object-contain"
                />
              )
            )}
          </div>

          <div
            className="flex items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className="border-2 border-cream/40 p-3 text-cream transition-colors hover:border-sun hover:text-sun"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <p className="eyebrow min-w-0 truncate text-center text-cream/70">
              {active.caption}
              <span className="ml-3 text-cream/40">
                {(openIndex ?? 0) + 1} / {items.length}
              </span>
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className="border-2 border-cream/40 p-3 text-cream transition-colors hover:border-sun hover:text-sun"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
