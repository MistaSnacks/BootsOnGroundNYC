import type { NextConfig } from "next";

// SnackBox serves media from a Cloudflare R2 custom domain (default
// media.snackboxcms.com). next/image rejects any remote host not listed here
// (400 INVALID_IMAGE_OPTIMIZE_REQUEST), so every site allowlists the media host
// in this one place — change it here only. Per-site override: set
// NEXT_PUBLIC_SNACKBOX_MEDIA_HOST when a project serves media from its own domain.
export function withSnackbox(config: NextConfig = {}): NextConfig {
  // `||`, not `??`: a var that is SET BUT EMPTY is the realistic failure here —
  // `vercel env add` with a blank value, or a .env line with nothing after the
  // `=`. `??` keeps that "" and next/image then builds a remotePattern with
  // `hostname: ""`, which throws `TypeError: Expected a non-empty string` out of
  // picomatch during the build, naming neither the variable nor this file.
  // Treating empty as absent turns an unexplained broken build into the default.
  const mediaHost = process.env.NEXT_PUBLIC_SNACKBOX_MEDIA_HOST?.trim() || "media.snackboxcms.com";
  const mediaPatterns = [
    { protocol: "https" as const, hostname: mediaHost, pathname: "/**" },
    // NOTE: media lives in R2 only. The Supabase Storage objects were purged on
    // 2026-07-25, so nothing below this line is reachable — it is kept solely
    // because an old site build somewhere might still reference those URLs.
    // Legacy Supabase Storage origin — kept so live sites keep rendering until the
    // CMS production storage has fully cut over to R2. Remove once no CMS content
    // returns supabase.co asset URLs.
    {
      protocol: "https" as const,
      hostname: "lapgrwxnirzmxhyhlviu.supabase.co",
      pathname: "/storage/v1/object/public/cms-media/**",
    },
  ];

  // Allow the CMS's Studio visual editor to frame this site (and nobody else).
  // Same reasoning as mediaHost: an empty value would emit
  // `frame-ancestors 'self' `, silently locking the Studio out of its own preview.
  const cmsOrigin = (process.env.NEXT_PUBLIC_SNACKBOX_URL?.trim() || "https://snackboxcms.com").replace(/\/$/, "");
  return {
    ...config,
    images: {
      ...config.images,
      remotePatterns: [...(config.images?.remotePatterns ?? []), ...mediaPatterns],
    },
    async headers() {
      const own = config.headers ? await config.headers() : [];
      return [
        ...own,
        {
          source: "/:path*",
          headers: [
            { key: "Content-Security-Policy", value: `frame-ancestors 'self' ${cmsOrigin}` },
          ],
        },
      ];
    },
  };
}
