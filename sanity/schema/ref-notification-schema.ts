import { Rule, SchemaTypeDefinition } from "sanity";

export const refnotification: SchemaTypeDefinition = {
  name: "ref_notification",
  title: "Notification Reference",
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
    },
    {
      name: "title",
      title: "Judul Notifikasi",
      type: "string",
    },
    {
      name: "type",
      title: "Tipe Notifikasi",
      type: "string",
      options: {
        list: [
          { title: "Penjadwalan Berhasil", value: "success" },
          { title: "Pengingat Jadwal", value: "info" },
        ],
      },
    },
    {
      name: "category",
      title: "Kategori Notifikasi",
      type: "string",
      options: {
        list: [
          {
            title: "Penjadwalan dengan Laboratorium/Fasilitas lain",
            value: "lab",
          },
          { title: "Penjadwalan dengan Poliklinik/dokter", value: "poli" },
          { title: "Berkaitan Dengan Administrasi", value: "admin" },
        ],
      },
    },
    {
      name: "message",
      title: "Tipe Notifikasi",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
