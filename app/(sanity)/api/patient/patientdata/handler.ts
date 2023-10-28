import { NEXT_PUBLIC_BASE_URL } from "@/sanity/env";
import { NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export default function handler(req: NextRequest, res: NextApiResponse) {
  revalidatePath(`${NEXT_PUBLIC_BASE_URL}/api/patient/patientdata/`);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  NextResponse.next();
}
