import { groq } from "next-sanity";

export const getLabPaketQuery = groq`*[_type=="lab_paket"]| order(id asc){
  _id,
    id,
    title,
   "img":{"src":img.asset->url,"alt":img.alt},
    "price":price[]
          {type,value},
    pemeriksaan,
    laboratorium
}`;

export const getLabPaketByIDQuery = groq`*[_type=="lab_paket" &&id==$id]| order(id asc){
  _id,
    id,
    title,
   "img":{"src":img.asset->url,"alt":img.alt},
    "price":price[]
          {type,value},
    pemeriksaan,
    laboratorium
}`;
