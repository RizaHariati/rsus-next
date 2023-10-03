import { Rule, SchemaTypeDefinition } from "sanity";

export const facility: SchemaTypeDefinition = {
  name: "facility",
  title: "Facility",
  type: "document",
  preview: {
    select: {
      title: "id",
      subtitle: "title",
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
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "title",
      title: "Nama Fasilitas",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "img",
      title: "Foto Fasilitas",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "description",
      title: "Keterangan",
      type: "string",
    },
    {
      name: "function",
      title: "Fungsi",
      type: "string",
    },
    {
      name: "poliklinik",
      title: "Poliklinik yang Menggunakan",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
    },
    {
      name: "doctorref",
      title: "Referensi Dokter",
      type: "boolean",
    },
    {
      name: "price",
      title: "Harga",
      type: "number",
    },
  ],
};
