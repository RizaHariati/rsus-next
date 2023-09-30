import { groq } from "next-sanity";
import { client } from "../lib/client";
import { FacilitySanityType } from "@/app/(tools)/types";

export async function getFacility(): Promise<FacilitySanityType[]> {
  return client.fetch(groq`*[_type=='facility']| order(id asc){
    id,
  title,
  "img":{"src":img.src,"alt":img.alt},
  description,
  function,
  poliklinik,
  category,
  featured,
  doctorref,
  price,
  }`);
}
