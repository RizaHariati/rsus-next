/* ----------- FORMATTING date String using moment YYYY-MM-DD[T]HH:mm ---------- */

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

export type FormScheduleType = {
  schedule_id: PersonalItemType;
  current_phone: PersonalItemType;
  tujuan: PersonalItemType;
  appointment_type: PersonalItemType;
  scheduled_date: PersonalItemType;
  register_date: PersonalItemType;
  using_bpjs: PersonalItemType;
  nomor_antrian: PersonalItemType;
};
export type PatientProfileType = {
  name: string;
  NIK: string;
  address: string;
  sex: number;
  birthdate: string;
  phone: string;
  register_date: string;
  password: string;
  bpjs_number?: string;
};

export type ScheduledType = {
  current_phone: string;
  schedule_id: string;
  tujuan: string[];
  appointment_type: "tatap_muka" | "telemedicine" | "test";
  scheduled_date: string;
  register_date: string;
  using_bpjs: boolean;
  nomor_antrian: number;
};

export type MedicalRecordDataType = {
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
export type NotificationType = {
  id: string;
  title?: string;
  notification_code: string;
  notification_date: string;
  seen: boolean;
  message?: string[];
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
