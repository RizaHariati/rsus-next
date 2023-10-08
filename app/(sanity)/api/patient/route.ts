import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function POST(req: Request, response: NextApiResponse) {
  const body = await req.json();

  const data = await writeClient
    .create({ ...body })
    .then((res) => NextResponse.json(res))
    .catch((err) => NextResponse.json(err));

  return data;
}
