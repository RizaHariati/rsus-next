import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export async function POST(req: Request, response: NextApiResponse) {
  const body = await req.json();

  const data = writeClient.create({ ...body });

  return Response.json(data);
}
