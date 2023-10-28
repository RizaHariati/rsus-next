import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_CONSUMER_URL } from "./sanity/env";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  if (pathname.startsWith(`/api/`)) {
    if (
      !req.headers
        .get("referer")
        ?.includes(NEXT_PUBLIC_BASE_URL || (NEXT_PUBLIC_CONSUMER_URL as string))
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)"],
};
