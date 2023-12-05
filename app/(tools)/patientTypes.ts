/* ----------- FORMATTING date String using moment YYYY-MM-DD[T]HH:mm ---------- */

export type UserType = {
  login: boolean;
  password?: string;
  medical_record_number?: string;
};

export type PatientItemType = {
  id: string;
  title: string;
  placeholder: string;
  error: string;
  number: boolean;
  editable: boolean;
};
export type FormProfileType = {
  name: PatientItemType;
  NIK: PatientItemType;
  address: PatientItemType;
  sex: PatientItemType;
  birthdate: PatientItemType;
  phone: PatientItemType;
  bpjs_number?: PatientItemType;
};

export type FormScheduleType = {
  schedule_id: PatientItemType;
  current_phone: PatientItemType;
  tujuan: PatientItemType;
  appointment_type: PatientItemType;
  scheduled_date: PatientItemType;
  register_date: PatientItemType;
  using_bpjs: PatientItemType;
  nomor_antrian: PatientItemType;
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

export type ScheduleDestinationsListType = {
  id: string;
  value: any[];
};
