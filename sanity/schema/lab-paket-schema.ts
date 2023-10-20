import { Rule, SchemaTypeDefinition } from "sanity";

export const labPaket: SchemaTypeDefinition = {
  name: "lab_paket",
  title: "Pilihan Laboratorium Paket",
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
      title: "Nama Paket",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "price",
      title: "Harga",
      type: "array",
      of: [
        {
          type: "object",
          name: "array_of_price",
          fields: [
            {
              name: "type",
              title: "Jenis",
              type: "string",
              options: {
                list: [
                  { title: "Semua", value: "all" },
                  { title: "Wanita", value: "wanita" },
                  { title: "Pria", value: "pria" },
                ],
              },
            },
            {
              name: "value",
              title: "Jumlah",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "img",
      title: "Icon Paket",
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
      name: "pemeriksaan",
      title: "Fasilitas Pemeriksaan yang didapatkan",
      type: "array",
      of: [
        {
          type: "object",
          name: "array_of_fas",
          fields: [
            {
              name: "id",
              title: "Id",
              type: "string",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "laboratorium",
      title: "Test Laboratorium yang didapatkan",
      type: "array",
      of: [
        {
          type: "object",
          name: "array_of_lab",
          fields: [
            {
              name: "id",
              title: "Id",
              type: "string",
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule: Rule) => rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
