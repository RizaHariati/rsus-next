import { NEXT_PUBLIC_BASE_URL } from "@/sanity/env";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { NextApiResponse } from "next";

const secret = process.env.SANITY_REVALIDATE_SECRET || "";

export default async function handler(request: any, response: NextApiResponse) {
  response.revalidate(`${NEXT_PUBLIC_BASE_URL}/api/`);
  response.revalidate(`${NEXT_PUBLIC_BASE_URL}/api/patient`);

  return response.status(200).send("noContent");
}
