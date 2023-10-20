import { Rule, SchemaTypeDefinition } from "sanity";

export const labSatuan: SchemaTypeDefinition = {
  name: "lab_satuan",
  title: "Pilihan Laboratorium Satuan",
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
      title: "Untuk Test",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "category",
      title: "Kategori",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "description",
      title: "Keterangan",
      type: "string",
    },
    {
      name: "price",
      title: "Harga",
      type: "number",
    },
  ],
};
