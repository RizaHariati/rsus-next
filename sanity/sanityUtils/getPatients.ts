import { groq } from "next-sanity";

import { PatientType } from "@/app/(tools)/patientTypes";
import moment from "moment";
import client from "./sanity-utils";

export async function getPatients(
  medicalRecordNumber?: string,
  password?: string
): Promise<PatientType[]> {
  if (!medicalRecordNumber || !password) {
    return [
      {
        medical_record_number: "",
        patient_profile: {
          name: "",
          NIK: "",
          address: "",
          sex: 1,
          birthdate: moment().format("YYYY-MM-DD[T]HH:mm"),
          phone: "",
          register_date: moment().format("YYYY-MM-DD[T]HH:mm"),
          password: "",
          bpjs_number: "",
        },
        scheduled_appointments: [],
        medical_records: [],
        notifications: [],
      },
    ];
  } else {
    return client.fetch(groq`*[_type=='patient'
  && medical_record_number =='${medicalRecordNumber}'
  && patient_profile.password=='${password}'
  ]{ medical_record_number,
    patient_profile,

    "scheduled_appointments":scheduled_appointments[]{
       schedule_id,
       current_phone,
       tujuan,
       appointment_type,
       scheduled_date,
       register_date,
       using_bpjs,
       nomor_antrian},

     medical_records,

    "notifications" : notifications[]{
        id,
        notification_code,
        title,
        message,
        notification_date,
        seen
   }
}`);
  }
}

export async function getPatient(medicalRecordNumber: string) {
  return client.fetch(groq`*[_type=='patient'
  && medical_record_number =='${medicalRecordNumber}'

  ]{ medical_record_number,
    patient_profile,

    "scheduled_appointments":scheduled_appointments[]{
       schedule_id,
       current_phone,
       tujuan,
       appointment_type,
       scheduled_date,
       register_date,
       using_bpjs,
       nomor_antrian},

     medical_records,

    "notifications" : notifications[]{
        id,
        notification_code,
        title,
        message,
        notification_date,
        seen
   }
}`);
}
