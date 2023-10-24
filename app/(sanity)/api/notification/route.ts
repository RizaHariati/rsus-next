import client, { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextRequest, NextResponse } from "next/server";

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

      return NextResponse.json({
        status: 200,
        message: "notification added",
        data,
      });
    } else {
      return NextResponse.json({ status: 404, message: "notification failed" });
    }
  }
}
