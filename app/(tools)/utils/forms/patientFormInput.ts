import { FormProfileType } from "../../patientTypes";

export const patientFormInput: FormProfileType = {
  name: {
    id: "profile_1",
    title: "Nama Pasien",
    placeholder: "Nama Pasien",
    error: "Nama pasien wajib dimasukkan",
    number: false,
    editable: true,
  },
  NIK: {
    id: "profile_2",
    title: "NIK",
    placeholder: "Nomor Induk di KTP Anda",
    error: "Nomor NIK wajib dimasukkan",
    number: true,
    editable: true,
  },
  address: {
    id: "profile_3",
    title: "Alamat",
    placeholder: "Alamat Pasien",

    error: "Nomor NIK wajib dimasukkan",
    number: false,
    editable: true,
  },
  sex: {
    id: "profile_4",
    title: "Jenis kelamin",
    placeholder: "masukkan jenis kelamin anda",
    error: "",
    number: true,
    editable: false,
  },
  birthdate: {
    id: "profile_5",
    title: "Tanggal lahir",
    placeholder: "DD/MM/YYYY",
    error: "Tanggal wajib dipilih",
    number: false,
    editable: false,
  },
  phone: {
    id: "profile_6",
    title: "Nomor Whatsapp untuk verifikasi ",
    placeholder: "Masukkan nomor Whatsapp yang aktif ",
    error: "Nomor telefon wajib dimasukkan",
    number: true,
    editable: true,
  },
  bpjs_number: {
    id: "profile_7",
    title: "Nomor BPJS  ",
    placeholder: " Nomor BPJS boleh memilih untuk memakai atau tidak",
    error: "",
    number: true,
    editable: true,
  },
};
