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
};

export type ArticleType = {
  id: number;
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
