import client, { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { _id, data } = await req.json();

  const responseData = await writeClient
    .patch(_id)
    .set({ notifications: [...data.notifications] })
    .commit();

  return NextResponse.json(responseData);
}
