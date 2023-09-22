import { patientFormInput } from "./utils/forms/patientFormInput";

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
  name: string;
  NIK: string;
  address: string;
  sex: boolean;
  birthdate: Date;
  phone: string;
  register_date: Date;
  password: string;
  bpjs_number?: string;
};

export type ScheduledType = {
  current_phone: string;
  schedule_id: string;
  tujuan: string[];
  appointment_type: "tatap_muka" | "telemedicine" | "test";
  selected_date: Date;
  using_bpjs: boolean;
  nomor_antrian: number;
};

export type MedicalRecordDataType = {
  med_id: string;
  appointment_type: string;
  incoming_date: Date;
  discharge_date: Date;
  riwayat: string;
  pemeriksaan: string;
  hasil_lab: string;
  diagnosis: string;
  tindakan: string;
};
export type NotificationType = {
  id: string;
  notification_code: string;
  schedule_code?: string;
  title: string;
  date: Date;
};

export type NotificationLibraryType = {
  id: string;
  type: string;
  title: string;
  category: string;
  message: string[];
};
export type PatientType = {
  medical_record_number: string;
  patient_profile: PatientProfileType;
  scheduled_appointments: ScheduledType[];
  medical_records: MedicalRecordDataType[];
  notifications: NotificationType[];
};

export type PatientInitialValueType = {
  [key: string]: { value: any; error: boolean };
};