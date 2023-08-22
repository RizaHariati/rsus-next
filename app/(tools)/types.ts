export type PersonalItemType = {
  id: number;
  value: string | boolean | number;
  title: string;
};
export type PatientPersonalType = {
  name: PersonalItemType;
  NIK: PersonalItemType;
  address: PersonalItemType;
  sex: PersonalItemType;
  birthdate: PersonalItemType;
  phone: PersonalItemType;
};
export type PatientType = {
  registered: boolean;
  medical_record?: string;
  profile: PatientPersonalType;
  bpjs: boolean;
  bpjs_number?: string;
};

export type SubDataType = {
  name: string;
  title: string;
  link: string;
  type: string;
};
export type DataMenuType = {
  id: number;
  name: string;
  title: string;
  link: string;
  subdata: SubDataType[];
};

export type FloatingMenuType = {
  name: string;
  title: string;
  link: string;
  image: string;
};

export type ConsultationMenuTypes = {
  name: string;
  title: string;
  description: string;
  image: string;
  modal: string;
  intro: string[];
  modal_img?: string;
};

export type ArticleType = {
  id: string;
  date: string;
  title: string;
  text: string[];
  newspaper: string;
  news_link: string;
  img: string;
  category: string;
  featured: boolean;
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

export type FacilityType = {
  id: string;
  title: string;
  img: string;
  description: string;
  function: string;
  poliklinik: string[];
  category: string;
  featured: boolean;
  doctorref: boolean;
  price: number;
};

export type CategoryFacilityType = {
  [key: string]: FacilityType[];
};

export type LabItemType = {
  id: string;
  title: string;
  description?: string;
  harga?: number;
  category?: string;
};
export type PaketLabType = {
  id: string;
  title: string;
  price: string;
  img: string;
  pemeriksaan: LabItemType[];
  laboratorium: LabItemType[];
};

export type DoctorType = {
  id: string;
  nama: string;
  waktu: string;
  poliklinik: { poli_id: string; title: string };
  hari: number[];
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

export type PoliklinikType = {
  id: string;
  title: string;
  img: string;
  description: string[];
};
