import { SchemaTypeDefinition } from "sanity";

export const doctor: SchemaTypeDefinition = {
  name: "doctor",
  title: "Doctors",
  type: "document",
  preview: {
    select: {
      subtitle: "name",
      title: "id",
    },
  },
  orderings: [
    {
      title: "Order by Id",
      name: "Id",
      by: [{ field: "id", direction: "asc" }],
    },
  ],
  fields: [
    {
      name: "id",
      title: "Id",
      type: "string",
    },
    {
      name: "name",
      title: "Nama Dokter",
      type: "string",
    },
    {
      name: "poliklinik",
      title: "Poliklinik",
      type: "object",
      fields: [
        {
          name: "poli_id",
          title: "Id Poliklinik",
          type: "string",
        },
        {
          name: "title",
          title: "Nama Poliklinik",
          type: "string",
        },
      ],
    },
    {
      name: "hari",
      title: "Hari kerja",
      type: "array",
      of: [
        {
          type: "object",
          name: "array_of_hari",
          fields: [
            {
              name: "id_hari",
              title: "Id Hari",
              type: "number",
            },
            {
              name: "kuota_terisi",
              title: "Kuota Terisi",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "jam",
      title: "Jam",
      type: "string",
    },
    {
      name: "waktu",
      title: "Waktu",
      type: "string",
    },
    {
      name: "gender",
      title: "Gender",
      type: "number",
    },
    {
      name: "on_call",
      title: "On Call",
      type: "number",
    },
    {
      name: "telemedicine",
      title: "Telemidicine",
      type: "number",
    },
    {
      name: "biaya_telemedicine",
      title: "Biaya Telemedicine",
      type: "number",
    },
    {
      name: "sedang_online",
      title: "Sedang Online",
      type: "number",
    },
    {
      name: "biaya_tatapmuka",
      title: "Biaya Tatap Muka",
      type: "number",
    },
    {
      name: "kuota",
      title: "Kuota Perhari",
      type: "number",
    },
    {
      name: "note",
      title: "Catatan",
      type: "string",
    },
    {
      name: "pengalaman",
      title: "Pengalaman",
      type: "number",
    },
  ],
};
