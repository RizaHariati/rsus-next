import { Rule, SchemaTypeDefinition } from "sanity";

export const patient: SchemaTypeDefinition = {
  name: "patient",
  title: "Patients",
  type: "document",
  orderings: [
    {
      title: "Patient Profile",
      name: "patient_profile",
      by: [{ field: "patient_profile", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      type: "patient",
      title: "patient_profile.name",
      subtitle: "medical_record_number",
    },
  },
  fields: [
    {
      name: "medical_record_number",
      title: "Nomor Rekam Medis",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },

    {
      name: "patient_profile",
      title: "Profil Pasien",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Nama Pasien",
          type: "string",
          validation: (rule: Rule) => rule.required(),
        },
        {
          name: "NIK",
          title: "Nomor KTP",
          type: "string",
          validation: (rule: Rule) => rule.required(),
        },
        {
          name: "address",
          title: "Alamat",
          type: "string",
          validation: (rule: Rule) => rule.required(),
        },
        {
          name: "sex",
          title: "Jenis Kelamin ",
          type: "number",
          initialValue: "pick one",
          validation: (rule: Rule) => rule.required(),
          options: {
            list: [
              { title: "pria", value: 1 },
              { title: "wanita", value: 0 },
            ],
          },
        },
        {
          name: "birthdate",
          title: "Tanggal Lahir",
          type: "date",
          validation: (rule: Rule) => rule.required(),
        },
        {
          name: "phone",
          title: "Nomor Telpon",
          type: "string",
          validation: (rule: Rule) => rule.required(),
        },
        {
          name: "register_date",
          title: "Tanggal Mendaftar",
          type: "date",
          validation: (rule: Rule) => rule.required(),
        },
        {
          name: "password",
          title: "Password",
          type: "string",
          validation: (rule: Rule) => rule.required(),
        },
        {
          name: "bpjs_number",
          title: "Nomor BPJS",
          type: "string",
        },
      ],
    },
    {
      name: "scheduled_appointments",
      title: "Jadwal Pertemuan",
      type: "array",
      of: [
        {
          type: "object",
          name: "array_of_schedule",
          fields: [
            {
              name: "schedule_id",
              title: "Schedule Id",
              type: "string",
            },
            {
              name: "current_phone",
              title: "Nomor Telpon yang digunakan untuk mendaftar",
              type: "string",
            },
            {
              name: "tujuan",
              title: "Tujuan Kunjungan",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "appointment_type",
              title: "Jenis Kunjungan",
              type: "string",
              options: {
                list: [
                  { title: "Konsultasi Tatap Muka", value: "tatap_muka" },
                  { title: "Konsultasi telemedicine", value: "telemedicine" },
                  {
                    title: "Pemeriksaan Laboratorium dan Fasilitas lain",
                    value: "test",
                  },
                ],
              },
            },
            {
              name: "scheduled_date",
              title: "Tanggal Jadwal",
              type: "datetime",
            },
            {
              name: "register_date",
              title: "Tanggal Penjadwalan",
              type: "datetime",
            },
            {
              name: "using_bpjs",
              title: "Mendaftar Menggunakan BPJS ?",
              type: "boolean",
            },
            {
              name: "nomor_antrian",
              title: "Nomor Antrian yang didapat saat mendaftar",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "medical_records",
      title: "List Rekam Medis",
      type: "array",
      of: [
        {
          type: "object",
          name: "array_of_medical_record",
          fields: [
            {
              name: "id",
              title: "Id",
              type: "string",
            },
            {
              name: "symptoms",
              title: "Keluhan dan Gejala",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "notifications",
      title: "Notifikasi",
      type: "array",
      of: [
        {
          type: "object",
          name: "array_of_notifications",
          fields: [
            {
              name: "id",
              title: "Id",
              type: "string",
            },
            {
              name: "notification_code",
              title: "Referensi Notifikasi",
              type: "string",
            },
            {
              name: "title",
              title: "Judul",
              type: "string",
            },
            {
              name: "message",
              title: "Isi notifikasi",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "notification_date",
              title: "Tanggal Notifikasi",
              type: "datetime",
            },
            {
              name: "seen",
              title: "Notifikasi sudah dilihat",
              type: "boolean",
            },
          ],
          preview: {
            select: {
              title: "id",
              subtitle: "title",
            },
          },
        },
      ],
    },
  ],
};
