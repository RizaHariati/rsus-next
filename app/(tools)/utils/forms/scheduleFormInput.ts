import { FormProfileType, FormScheduleType } from "../../patientTypes";

export const scheduleFormInput: FormScheduleType = {
  tujuan: {
    id: "schedule_1",
    title: "Tujuan",
    placeholder: "Tujuan penjadwalan",
    col_width: 2,
    error: "Tujuan wajib dimasukkan",
  },
  schedule_id: {
    id: "schedule_2",
    title: "ID Jadwal",
    placeholder: "Jadwal pemeriksaan",
    error: "Jadwal pemeriksaan wajib dimasukkan",
  },
  current_phone: {
    id: "schedule_3",
    title: "Nomor Telpon yang digunakan ",
    placeholder: "Nomor Telpon Anda",
    error: "Nomor Telpon wajib dimasukkan",
  },
  appointment_type: {
    id: "schedule_4",
    title: "Jenis Penjadwalan",
    placeholder: "masukkan jenis kelamin anda",
    error: "",
  },
  scheduled_date: {
    id: "schedule_5",
    title: "Jadwal Pemeriksaan",
    placeholder: "DD/MM/YYYY",
    error: "Tanggal wajib dipilih",
  },
  register_date: {
    id: "schedule_6",
    title: "Tanggal Pendaftaran Pemeriksaan",
    placeholder: "DD/MM/YYYY",
    error: "Tanggal wajib dipilih",
  },
  using_bpjs: {
    id: "schedule_7",
    title: "Pendaftaran menggunakan BPJS",
    placeholder: "Apakah menggunakan BPJS ",
    error: "Konfirmasi BPJS wajib dimasukkan",
    col_width: 2,
  },
  nomor_antrian: {
    id: "schedule_8",
    title: "Nomor Antrian ",
    placeholder: " Nomor BPJS boleh memilih untuk memakai atau tidak",
    error: "",
    col_width: 2,
  },
};
