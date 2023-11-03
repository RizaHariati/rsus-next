import { groq } from "next-sanity";

export const getDoctorQuery = groq`*[_type=='doctor']| order(id asc){
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
    sedang_online,
    biaya_tatapmuka,
    kuota,
    note,
    pengalaman
    }`;

export const getDoctorByIDQuery = groq`*[_type=='doctor'&& id==$id]| order(id asc){
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
    sedang_online,
    biaya_tatapmuka,
    kuota,
    note,
    pengalaman
    }`;
