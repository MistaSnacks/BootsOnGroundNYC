import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// SnackBox POSTs here when content changes. Secret is shared with the CMS
// (REVALIDATE_SECRET_<SLUG> on the CMS side, REVALIDATION_SECRET here).
export async function POST(req: Request) {
  // The CMS sends both header spellings because live sites disagree on which
  // one they read; accept either.
  const secret = req.headers.get("x-revalidation-secret") ?? req.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { paths, tags } = (await req.json()) as { paths?: string[]; tags?: string[] };

  // Paths clear the route (HTML/RSC) cache…
  for (const path of paths ?? []) revalidatePath(path);

  // …and tags clear the Data Cache entries behind it, which is the half that
  // makes publishing instant. `{ expire: 0 }` rather than the 'max' profile:
  // 'max' is stale-while-revalidate, so the first visitor after a publish
  // still gets the old page and the refresh happens behind them. Expiring the
  // entry makes the next request re-fetch, which is what publishing means.
  for (const tag of tags ?? []) revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ ok: true, revalidated: paths ?? [], tags: tags ?? [] });
}
