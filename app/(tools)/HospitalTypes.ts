export type CategoryFacilityType = {
  [key: string]: FacilitySanityType[];
};

export type FacilityType = {
  id: string;
  title: string;
  img: { alt: string };
  description: string;
  function: string;
  poliklinik: string[];
  category: string;
  featured: boolean;
  doctorref: boolean;
  price: number;
};
export type FacilitySanityType = {
  _id: string;
  id: string;
  title: string;
  img: { src: string; alt: string };
  description: string;
  function: string;
  poliklinik: string[];
  category: string;
  featured: boolean;
  doctorref: boolean;
  price: number;
};

export type LabItemType = {
  _id: string;
  id: string;
  title: string;
  description?: string;
  price: number;
  category: string;
};

export type InpatientType = {
  id: string;
  kelas: string;
  pasien: number;
  harga: string;
  img: string;
  "img-array": string[];
  fasilitas: string[];
};

export type PemeriksaanType = Omit<LabItemType, "price" | "category">;
export type LaboratoriumType = Omit<
  LabItemType,
  "price" | "category" | "description"
>;
export type PaketLabType = {
  _id: string;
  id: string;
  title: string;
  price: { type: string; value: number }[];
  img: string;
  pemeriksaan: PemeriksaanType[];
  laboratorium: LaboratoriumType[];
};
export type DoctorType = {
  _id: string;
  id: string;
  name: string;
  waktu: string;
  poliklinik: { poli_id: string; title: string };
  hari: HariType[];
  jam: string;
  gender: number;
  on_call: number;
  telemedicine: number;
  biaya_telemedicine?: number;
  sedang_online?: number;
  biaya_tatapmuka: number;
  kuota: number;
  note?: string;
  pengalaman: number;
};
export type HariType = {
  id_hari: number;
  kuota_terisi: number;
};

export type PoliklinikType = {
  id: string;
  title: string;
  img: string;
  description: string[];
};

export type HospitalItemType = {
  id: string;
  title: string;
  placeholder: string;
  editable: boolean;
  error: string;
};
export type FormDoctorType = {
  name: HospitalItemType;
  id: HospitalItemType;
  poliklinik: HospitalItemType;
  waktu: HospitalItemType;
  hari: HospitalItemType;
  jam: HospitalItemType;
  gender: HospitalItemType;
  on_call: HospitalItemType;
  telemedicine: HospitalItemType;
  biaya_telemedicine: HospitalItemType;
  sedang_online: HospitalItemType;
  biaya_tatapmuka: HospitalItemType;
  kuota: HospitalItemType;
  pengalaman: HospitalItemType;
};

export type FormFacilityType = {
  id: HospitalItemType;
  title: HospitalItemType;
  img: HospitalItemType;
  description: HospitalItemType;
  function: HospitalItemType;
  poliklinik: HospitalItemType;
  category: HospitalItemType;
  featured: HospitalItemType;
  doctorref: HospitalItemType;
  price: HospitalItemType;
};

export type FormLabSatuanType = {
  id: HospitalItemType;
  title: HospitalItemType;
  description: HospitalItemType;
  price: HospitalItemType;
  category: HospitalItemType;
};
export type DoctorInitialValueType = {
  [key: string]: { value: any; error: boolean };
};

export type FacilityInitialValueType = {
  [key: string]: { value: any; error: boolean };
};

export type LabPaketInitialValueType = {
  [key: string]: { value: any; error: boolean };
};

export type InpatientInitialValueType = {
  [key: string]: { value: any; error: boolean };
};

export type FormLabPaketType = {
  title: HospitalItemType;
  id: HospitalItemType;
  price: HospitalItemType;
  img: HospitalItemType;
  pemeriksaan: HospitalItemType;
  laboratorium: HospitalItemType;
};

export type FormInpatientType = {
  id: HospitalItemType;
  kelas: HospitalItemType;
  pasien: HospitalItemType;
  harga: HospitalItemType;
  img: HospitalItemType;
  "img-array": HospitalItemType;
  fasilitas: HospitalItemType;
};
