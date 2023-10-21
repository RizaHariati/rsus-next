import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("enter middleware");
  console.log({ message: SIGNATURE_HEADER_NAME });
  NextResponse.json({ message: isValidSignature });
  return NextResponse.next();
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:function*",
};
