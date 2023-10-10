import client, { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const data = await writeClient
    .create({ ...body })
    .then((res) => NextResponse.json(res))
    .catch((err) => NextResponse.json(err));

  return data;
}

export async function PUT(req: Request) {
  const { _id, data } = await req.json();

  if (req.method === "PUT") {
    const responseData = await writeClient
      .patch(_id)
      .set({ notifications: [...(data.notifications || [])] })
      .commit()
      .then((res) => NextResponse.json(res))
      .catch((err) => NextResponse.json(err));

    return responseData;
  } else {
    return;
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (req.method === "DELETE") {
    const data = await writeClient
      .delete(body._id)
      .then((res) => NextResponse.json(res))
      .catch((err) => NextResponse.json(err));
    return data;
  } else {
    return;
  }
}
