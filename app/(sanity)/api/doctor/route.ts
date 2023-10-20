import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function GET(req: NextRequest) {
  const data = await writeClient.fetch(
    groq`*[_type=='doctor']| order(id asc){
    id,
    name,
    waktu,
    "poliklinik":
        {"poli_id":poliklinik.poli_id,
          "title":poliklinik.title},
    "hari":hari[],
    jam,
    gender,
    on_call,
    telemedicine,
    biaya_telemedicine,
    biaya_tatapmuka,
    kuota,
    note,
    pengalaman
    }`
  );
  return NextResponse.json(data);
}
