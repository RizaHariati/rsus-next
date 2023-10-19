import client, { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function PUT(req: NextRequest) {
  const { _id, data } = await req.json();

  if (!_id || !data) {
    return NextResponse.json({ status: 400, message: "invalid data" });
  } else {
    if (req.method === "PUT") {
      const responseData = await writeClient
        .patch(_id)
        .set({ notifications: [...data.notifications] })
        .commit()
        .then((res) => NextResponse.json(res))
        .catch((err) => NextResponse.json(err));

      return responseData;
    } else {
      return NextResponse.json({ message: "notification failed" });
    }
  }
}
