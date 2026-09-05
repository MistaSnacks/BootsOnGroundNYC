import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.delete("x-sbx-public-view");
  if (req.nextUrl.searchParams.get("sbx-public") === "1") headers.set("x-sbx-public-view", "1");
  return NextResponse.next({ request: { headers } });
}
// Ordinary public traffic does not invoke Proxy. Verification only suppresses
// draft access; this header is never an authorization credential.
export const config = { matcher: [{
  source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
  has: [{ type: "query", key: "sbx-public", value: "1" }],
}] };
