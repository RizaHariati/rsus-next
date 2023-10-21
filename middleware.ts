import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isValidSignature,
  SIGNATURE_HEADER_NAME,
  ConnectLikeRequest,
} from "@sanity/webhook";
import { parseBody } from "next-sanity/webhook";
// This function can be marked `async` if using `await` inside

const secret = process.env.SANITY_REVALIDATE_SECRET || "";
export async function middleware(request: NextRequest) {
  //   if (!request.body) return NextResponse.next();
  //   const signature = request.headers.get(SIGNATURE_HEADER_NAME) as string;

  //   const body = JSON.stringify(await request.json()); // Read the body into a stringc
  //   console.log({ body });
  //   console.log(isValidSignature(body, signature, secret));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:function*",
  api: {
    bodyParser: false,
  },
};
