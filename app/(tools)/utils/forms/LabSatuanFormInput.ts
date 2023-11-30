import { FormLabSatuanType } from "../../HospitalTypes";

export const labSatuanForm: FormLabSatuanType = {
  title: {
    id: "labSatuan_01",
    title: "Judul",
    placeholder: "masukkan Judul",
    editable: true,
    error: "Judul wajib diisi",
    number: false,
  },
  id: {
    id: "labSatuan_02",
    title: "ID",
    placeholder: "masukkan id",
    editable: false,
    error: "id wajib diisi",
    number: false,
  },
  description: {
    id: "labSatuan_03",
    title: "keterangan",
    placeholder: "masukkan keterangan",
    editable: true,
    error: "keterangan wajib diisi",
    number: false,
  },
  price: {
    id: "labSatuan_04",
    title: "harga",
    placeholder: "masukkan harga",
    editable: true,
    error: "harga wajib diisi",
    number: true,
  },
  category: {
    id: "labSatuan_05",
    title: "kategori",
    placeholder: "masukkan kategori",
    editable: true,
    error: "kategori wajib diisi",
    number: false,
  },
};
