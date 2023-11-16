import { FormInpatientType } from "../../HospitalTypes";

export const inpatientForm: FormInpatientType = {
  kelas: {
    id: "inpatient_01",
    title: "Judul",
    placeholder: "masukkan Judul",
    editable: true,
    error: "Judul wajib diisi",
  },
  id: {
    id: "inpatient_02",
    title: "ID",
    placeholder: "masukkan id",
    editable: false,
    error: "id wajib diisi",
  },
  pasien: {
    id: "inpatient_03",
    title: "jumlah pasien per kamar",
    placeholder: "masukkan jumlah pasien per kamar",
    editable: true,
    error: "jumlah pasien per kamar wajib diisi",
  },
  harga: {
    id: "inpatient_04",
    title: "harga",
    placeholder: "masukkan harga",
    editable: true,
    error: "harga wajib diisi",
  },
  img: {
    id: "inpatient_05",
    title: "img",
    placeholder: "masukkan img",
    editable: true,
    error: "img wajib diisi",
  },
  "img-array": {
    id: "inpatient_06",
    title: "image",
    placeholder: "masukkan image",
    editable: true,
    error: "image wajib diisi",
  },
  fasilitas: {
    id: "inpatient_07",
    title: "fasilitas",
    placeholder: "masukkan fasilitas",
    editable: true,
    error: "fasilitas wajib diisi",
  },
};
