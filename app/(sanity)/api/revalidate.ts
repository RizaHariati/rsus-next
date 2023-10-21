import { NEXT_PUBLIC_BASE_URL } from "@/sanity/env";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.SANITY_REVALIDATE_SECRET || "";

export default async function handler(request: any, response: NextApiResponse) {
  console.log("enter header");

  const signature = request.headers[SIGNATURE_HEADER_NAME] as string;
  const jsonBody = await request.json();
  const body = JSON.stringify(jsonBody);
  const valid = isValidSignature(body, SIGNATURE_HEADER_NAME, secret);
  //   const body = await readBody(req); // Read the body into a string
  //   if (!isValidSignature(body, signature, secret)) {
  //     res.status(401).json({ success: false, message: "Invalid signature" });
  //     return;
  //   }

  response.revalidate(`${NEXT_PUBLIC_BASE_URL}/api/`);
  response.revalidate(`${NEXT_PUBLIC_BASE_URL}/api/patient`);
  // console.log(`${NEXT_PUBLIC_BASE_URL}/api/`);
  // response.setHeader("Access-Control-Allow-Credentials", "true");
  // response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  // );
  response.setHeader(
    "Authorization",
    "Bearer  skOuTPWYzAeqk7ISYYWNtxpmhpbzmmDh1e1VZPLA1VWpSGufmcHLXtbSwrgHRboQu706ofMkRfApPVF2nUMEAnkaKu3lsuvnDDQTSuALJ7DmuXL3zUVOcn8ei1UjgDKnDGHUv8iDSCdH4RwDXTUFbVZaIuosoguVI9lJCt5gxjbsc16u0zgb"
  );
  //   const jsonBody = JSON.parse(body);
  //   console.log({ jsonBody });
  //   res.json({ success: true });
  return response.status(200).send("noContent");
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
