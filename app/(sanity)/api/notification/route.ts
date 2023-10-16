import client, { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextResponse } from "next/server";
export const runtime = "edge";
export async function PUT(req: Request) {
  const { _id, data } = await req.json();

  if (req.method === "PUT") {
    const responseData = await writeClient
      .patch(_id)
      .set({ notifications: [...data.notifications] })
      .commit()
      .then((res) => NextResponse.json(res))
      .catch((err) => NextResponse.json(err));

    return responseData;
  } else {
    return;
  }
}
