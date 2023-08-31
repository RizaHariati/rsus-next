export type UserType = {
  login: boolean;
  password?: string;
  medical_record_number?: string;
};

export type PersonalItemType = {
  id: string;
  sample_value: any;
  title: string;
  placeholder: string;
  col_width?: number;
};
export type FormProfileType = {
  register_date: PersonalItemType;
  name: PersonalItemType;
  NIK: PersonalItemType;
  address: PersonalItemType;
  sex: PersonalItemType;
  birthdate: PersonalItemType;
  phone: PersonalItemType;
};

export type PatientProfileType = {
  name: string;
  NIK: string;
  address: string;
  sex: boolean;
  birthdate: string;
  phone: string;
};

export type PatientSchedule = {
  destination: "string";
  date: string;
  using_bpjs: boolean;
};
export type PatientType = {
  register_date: string;
  medical_record_number: string;
  password: string;
  profile: PatientProfileType;
  bpjs: boolean;
  bpjs_number?: string;
  schedule?: PatientSchedule[];
};
