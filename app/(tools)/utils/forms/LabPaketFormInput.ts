import { FormLabPaketType } from "../../HospitalTypes";

export const labPaketForm: FormLabPaketType = {
  title: {
    id: "labPaket_01",
    title: "Judul",
    placeholder: "masukkan Judul",
    editable: true,
    error: "Judul wajib diisi",
  },
  id: {
    id: "labPaket_02",
    title: "ID",
    placeholder: "masukkan id",
    editable: false,
    error: "id wajib diisi",
  },
  price: {
    id: "labPaket_03",
    title: "harga",
    placeholder: "masukkan harga",
    editable: true,
    error: "harga wajib diisi",
  },
  img: {
    id: "labPaket_04",
    title: "img",
    placeholder: "masukkan img",
    editable: true,
    error: "img wajib diisi",
  },
  pemeriksaan: {
    id: "labPaket_05",
    title: "pemeriksaan",
    placeholder: "masukkan pemeriksaan",
    editable: true,
    error: "pemeriksaan wajib diisi",
  },
  laboratorium: {
    id: "labPaket_06",
    title: "laboratorium",
    placeholder: "masukkan laboratorium",
    editable: true,
    error: "laboratorium wajib diisi",
  },
};
