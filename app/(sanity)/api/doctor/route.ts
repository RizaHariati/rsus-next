import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import {
  getDoctorByIDQuery,
  getDoctorQuery,
} from "../../components/doctor.queries";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  const data = id
    ? await writeClient.fetch(getDoctorByIDQuery, { id })
    : await writeClient.fetch(getDoctorQuery);

  return NextResponse.json(data);
}
