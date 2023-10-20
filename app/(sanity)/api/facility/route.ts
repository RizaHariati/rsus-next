import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function GET(req: NextRequest) {
  const data = await writeClient.fetch(groq`*[_type=='facility']| order(id asc)
  {  id,
  title,
  "img":{"src":img.asset->url,"alt":img.alt},
  description,
  function,
  poliklinik,
  category,
  featured,
  doctorref,
  price,
  }`);
  return NextResponse.json(data);
}
