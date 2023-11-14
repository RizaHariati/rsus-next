import { groq } from "next-sanity";

export const getLabSatuanQuery = groq`*[_type=='lab_satuan']| order(id asc){
   _id,
    id,
    title,
    price,
    description,
    category
}`;

export const getLabSatuanByIDQuery = groq`*[_type=='lab_satuan' &&id==$id]| order(id asc){
   _id,
    id,
    title,
    price,
    description,
    category
}`;
