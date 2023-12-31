import { FormFacilityType } from "../../HospitalTypes";

export const facilityForm: FormFacilityType = {
  title: {
    id: "facility_01",
    title: "Judul",
    placeholder: "masukkan Judul",
    editable: true,
    error: "Judul wajib diisi",
    number: false,
  },
  id: {
    id: "facility_02",
    title: "Id",
    placeholder: "masukkan id",
    editable: false,
    error: "id wajib diisi",
    number: false,
  },

  img: {
    id: "facility_03",
    title: "Gambar",
    placeholder: "masukkan gambar",
    editable: true,
    error: "Gambar wajib diisi",
    number: false,
  },
  description: {
    id: "facility_04",
    title: "keterangan",
    placeholder: "masukkan keterangan",
    editable: true,
    error: "keterangan wajib diisi",
    number: false,
  },
  function: {
    id: "facility_05",
    title: "fungsi",
    placeholder: "masukkan fungsi",
    editable: true,
    error: "fungsi wajib diisi",
    number: false,
  },
  poliklinik: {
    id: "facility_06",
    title: "poliklinik yang menggunakan",
    placeholder: "masukkan poliklinik",
    editable: true,
    error: "poliklinik wajib diisi",
    number: false,
  },
  category: {
    id: "facility_07",
    title: "kategori",
    placeholder: "masukkan kategori",
    editable: true,
    error: "kategori wajib diisi",
    number: false,
  },
  featured: {
    id: "facility_08",
    title: "Unggulan",
    placeholder: "Fasilitas unggulan",
    editable: true,
    error: "feature wajib diisi",
    number: false,
  },
  doctorref: {
    id: "facility_09",
    title: "Memerlukan Referensi dokter",
    placeholder: "masukkan referensi",
    editable: true,
    error: "referensi wajib diisi",
    number: true,
  },
  price: {
    id: "facility_10",
    title: "harga",
    placeholder: "masukkan harga",
    editable: true,
    error: "harga wajib diisi",
    number: true,
  },
};
