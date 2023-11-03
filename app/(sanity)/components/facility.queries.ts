import { groq } from "next-sanity";

export const getFacilityQuery = groq`*[_type=='facility']| order(id asc)
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
  }`;

export const getFacilityByIDQuery = groq`*[_type=='facility'&& id== $id]| order(id asc)
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
  }`;
