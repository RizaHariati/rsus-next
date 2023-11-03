import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextRequest, NextResponse } from "next/server";
import {
  getFacilityByIDQuery,
  getFacilityQuery,
} from "../../components/facility.queries";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  const data = id
    ? await writeClient.fetch(getFacilityByIDQuery, { id })
    : await writeClient.fetch(getFacilityQuery);
  return NextResponse.json(data);
}
