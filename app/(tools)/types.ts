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

export type AppointmentMenuTypes = {
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
// *[_type=="facility"]| order(id asc){
//   id,
//   title,
//   img,
//   description,
//   function,
//   poliklinik,
//   category,
//   featured,
//   doctorref,
//   price,
// }
export type CategoryFacilityType = {
  [key: string]: FacilitySanityType[];
};

export type LabItemType = {
  id: string;
  title: string;
  description?: string;
  price: number;
  category: string;
};

export type PemeriksaanType = Omit<LabItemType, "price" | "category">;
export type LaboratoriumType = Omit<
  LabItemType,
  "price" | "category" | "description"
>;

export type PaketLabType = {
  id: string;
  title: string;
  price: { type: string; value: number }[];
  img: string;
  pemeriksaan: PemeriksaanType[];
  laboratorium: LaboratoriumType[];
};

export type HariType = {
  id_hari: number;
  kuota_terisi: number;
};

export type DoctorType = {
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

export type PoliklinikType = {
  id: string;
  title: string;
  img: string;
  description: string[];
};

export type FilterDoctorType = {
  category: "spesialisasi" | "dokter";
  value: DoctorType[];
  keyword?: string;
};

export type LabCartType = {
  id: string;
  title: string;
  description: string[];
  price: number;
};
