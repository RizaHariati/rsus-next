import { groq } from "next-sanity";
import { FacilitySanityType } from "@/app/(tools)/types";
import client from "./sanity-utils";

export async function getFacility(): Promise<FacilitySanityType[]> {
  return client.fetch(groq`*[_type=='facility']| order(id asc)
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
}
