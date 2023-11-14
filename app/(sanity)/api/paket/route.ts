import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextRequest, NextResponse } from "next/server";
import {
  getLabPaketByIDQuery,
  getLabPaketQuery,
} from "../../components/paket.queries";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  const data = id
    ? await writeClient.fetch(getLabPaketByIDQuery, { id })
    : await writeClient.fetch(getLabPaketQuery);
  return NextResponse.json(data);
}
