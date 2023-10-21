import { NEXT_PUBLIC_BASE_URL } from "@/sanity/env";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.SANITY_REVALIDATE_SECRET || "";

export default async function handler(request: any, res: NextApiResponse) {
  console.log("enter header");

  const signature = request.headers.get(SIGNATURE_HEADER_NAME) as string;
  const jsonBody = await request.json();
  const body = JSON.stringify(jsonBody);
  const valid = isValidSignature(body, signature, secret);
  //   const body = await readBody(req); // Read the body into a string
  //   if (!isValidSignature(body, signature, secret)) {
  //     res.status(401).json({ success: false, message: "Invalid signature" });
  //     return;
  //   }
  res.revalidate(`${NEXT_PUBLIC_BASE_URL}/api/`);
  //   const jsonBody = JSON.parse(body);
  //   console.log({ jsonBody });
  //   res.json({ success: true });
  return NextResponse.json({ valid });
}

// Next.js will by default parse the body, which can lead to invalid signatures
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function readBody(readable: any) {
//   const chunks = [];
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks).toString("utf8");
// }
