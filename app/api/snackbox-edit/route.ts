import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Edit-mode bootstrap for SnackBox on-site editing: overlay.js sends editors
// here once when the page carries no stega annotations. We verify their
// overlay token against the CMS, enable Next draft mode (dynamic, uncached
// rendering — the adapter then fetches with stega=1), keep the token in an
// httpOnly cookie so those fetches can read the draft perspective (drafts
// render in place for the editor, never for the public), and bounce back.

/** Matches EDIT_TTL_MS on the CMS side (12h); an expired token just 403s. */
const TOKEN_COOKIE = "sbx-edit-token";
const TOKEN_MAX_AGE = 12 * 60 * 60;
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const ret = req.nextUrl.searchParams.get("return") ?? "/";

  const cms = (process.env.NEXT_PUBLIC_SNACKBOX_URL ?? "").replace(/\/$/, "");
  const project = process.env.NEXT_PUBLIC_SNACKBOX_PROJECT ?? "";
  if (!cms || !project || !token) {
    return NextResponse.json({ error: "Edit mode is not configured" }, { status: 400 });
  }

  const session = await fetch(`${cms}/api/overlay/session?project=${encodeURIComponent(project)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
    .then((r) => r.json())
    .catch(() => null);
  if (!session?.ok) {
    return NextResponse.json({ error: "Not an editor session" }, { status: 403 });
  }

  (await draftMode()).enable();

  // Only ever redirect within this site.
  let target: URL;
  try {
    target = new URL(ret, req.nextUrl.origin);
    if (target.origin !== req.nextUrl.origin) target = new URL("/", req.nextUrl.origin);
  } catch {
    target = new URL("/", req.nextUrl.origin);
  }
  const res = NextResponse.redirect(target);
  res.cookies.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_MAX_AGE,
  });
  return res;
}
