import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("enter middleware");
  NextResponse.json({ message: SIGNATURE_HEADER_NAME });
  return NextResponse.next();
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
