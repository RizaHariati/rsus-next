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
          title: "Jenis Kelamin",
          type: "boolean",
          validation: (rule: Rule) => rule.required(),
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
          type: "number",
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
              of: [
                {
                  name: "pick_destination",
                  title: "pilih satu",
                  type: "reference",
                  to: [
                    {
                      type: "facility",
                      preview: {
                        select: { title: "title" },
                      },
                    },
                    {
                      type: "doctor",
                      preview: {
                        select: { title: "nama" },
                      },
                    },
                  ],
                },
              ],
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
      name: "medical_record",
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
      name: "notification",
      title: "Notifikasi",
      type: "array",
      of: [
        {
          type: "object",
          name: "array_of_notifications",
          fields: [
            {
              name: "id",
              title: "ID",
              type: "string",
            },
            {
              name: "notification_code",
              title: "Referensi Notifikasi",
              type: "reference",
              to: [
                {
                  type: "ref_notification",
                  title: "judul",
                },
              ],
            },
            {
              name: "schedule_code",
              title: "Referensi Jadwal",
              type: "reference",
              to: [
                {
                  type: "patient",
                },
              ],
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
        },
      ],
    },
  ],
};
