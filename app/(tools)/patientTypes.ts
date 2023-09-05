export type UserType = {
  login: boolean;
  password?: string;
  medical_record_number?: string;
};

export type PersonalItemType = {
  id: string;
  title: string;
  placeholder: string;
  col_width?: number;
  error: string;
};
export type FormProfileType = {
  name: PersonalItemType;
  NIK: PersonalItemType;
  address: PersonalItemType;
  sex: PersonalItemType;
  birthdate: PersonalItemType;
  phone: PersonalItemType;
  bpjs_number?: PersonalItemType;
};

export type PatientProfileType = {
  medical_record_number: string;
  name: string;
  NIK: string;
  address: string;
  sex: boolean;
  birthdate: string;
  phone: string;
  register_date: string;
  password: string;
  bpjs_number?: string;
};

export type ScheduledType = {
  current_phone: string;
  medical_record_number: string;
  schedule_id: string;
  doctor: string;
  appointment_type: string;
  selected_date: string;
  using_bpjs: boolean;
  kuota_number: number;
};
export type MedicalRecordDataType = {
  medical_record_number: string;
  med_id: string;
  appointment_type: string;
  incoming_date: string;
  discharge_date: string;
  riwayat: string;
  pemeriksaan: string;
  hasil_lab: string;
  diagnosis: string;
  tindakan: string;
};

export type PatientType = {
  medical_record_number: string;
  profile: PatientProfileType;
  scheduled_appointments: ScheduledType[];
  medical_records: MedicalRecordDataType[];
};

export type PatientInitialValueType = {
  [key: string]: { value: any; error: boolean };
};
