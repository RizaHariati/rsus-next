import { FormFacilityType } from "../../HospitalTypes";

export const facilityForm: FormFacilityType = {
  title: {
    id: "facility_01",
    title: "Judul",
    placeholder: "masukkan Judul",
    editable: true,
    error: "Judul wajib diisi",
  },
  id: {
    id: "facility_02",
    title: "ID",
    placeholder: "masukkan id",
    editable: false,
    error: "id wajib diisi",
  },

  img: {
    id: "facility_03",
    title: "Gambar",
    placeholder: "masukkan img",
    editable: true,
    error: "Gambar wajib diisi",
  },
  description: {
    id: "facility_04",
    title: "keterangan",
    placeholder: "masukkan keterangan",
    editable: true,
    error: "keterangan wajib diisi",
  },
  function: {
    id: "facility_05",
    title: "fungsi",
    placeholder: "masukkan fungsi",
    editable: true,
    error: "fungsi wajib diisi",
  },
  poliklinik: {
    id: "facility_06",
    title: "poliklinik yang menggunakan",
    placeholder: "masukkan poliklinik",
    editable: true,
    error: "poliklinik wajib diisi",
  },
  category: {
    id: "facility_07",
    title: "kategori",
    placeholder: "masukkan kategori",
    editable: true,
    error: "kategori wajib diisi",
  },
  featured: {
    id: "facility_08",
    title: "feature",
    placeholder: "masukkan feature",
    editable: true,
    error: "feature wajib diisi",
  },
  doctorref: {
    id: "facility_09",
    title: "Memerlukan Referensi dokter",
    placeholder: "masukkan referensi",
    editable: true,
    error: "referensi wajib diisi",
  },
  price: {
    id: "facility_10",
    title: "harga",
    placeholder: "masukkan harga",
    editable: true,
    error: "harga wajib diisi",
  },
};
