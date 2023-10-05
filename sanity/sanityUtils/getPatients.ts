import { groq } from "next-sanity";
import { client } from "../lib/client";
import { PatientType } from "@/app/(tools)/patientTypes";

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
          birthdate: new Date(),
          phone: "",
          register_date: new Date(),
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
  ]{
  medical_record_number,
    "patient_profile":{
     "name": patient_profile.name,
    "NIK":patient_profile.NIK,
  "address": patient_profile.address,
  "sex": patient_profile.sex,
  "birthdate": patient_profile.birthdate,
  "phone": patient_profile.phone,
  "register_date": patient_profile.register_date,
  "password": patient_profile.password,
  "bpjs_number": patient_profile.bpjs_number    },

  "scheduled_appointments":scheduled_appointments[]{
       schedule_id,
       current_phone,
       "tujuan":tujuan[]->{id},
       appointment_type,
       scheduled_date,
       register_date,
       using_bpjs,
       nomor_antrian},
    medical_records,
    notification
}`);
  }
}
