import {
  sampleNotifications,
  sampleProfile,
  sampleSchedule,
} from "@/app/(tools)/data/sample";
import {
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
} from "../env";
import { ClientConfig, createClient, groq } from "next-sanity";
import { writeClient } from "./sanity-utils";

const URL_PATIENT = `${NEXT_PUBLIC_BASE_URL}/api/patient/`;
export async function getPatient(
  medicalRecordNumber: string,
  password?: string
): Promise<any> {
  const body = {
    _id: "basjdfbsadf",
    medicalRecordNumber,
    password,
    isValidSignature:
      "Ocn8ei1UjgDKnDGHUv8iDSCdH4RwDXTUFbVZaIuosoguVI9lJCt5gxjbsc16u0zgb",
  };
  const options: RequestInit = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const projectId = NEXT_PUBLIC_SANITY_PROJECT_ID || "tis66dpo";
  const dataset = NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-29";
  const clientConfig: ClientConfig = {
    projectId,
    dataset,
    apiVersion,
    // token: SANITY_DEPLOY_TOKEN,

    token:
      "skOuTPWYzAeqk7ISYYWNtxpmhpbzmmDh1e1VZPLA1VWpSGufmcHLXtbSwrgHRboQu706ofMkRfApPVF2nUMEAnkaKu3lsuvnDDQTSuALJ7DmuXL3zUVOcn8ei1UjgDKnDGHUv8iDSCdH4RwDXTUFbVZaIuosoguVI9lJCt5gxjbsc16u0zgb",
    // https://www.sanity.io/docs/api-versioning,

    useCdn: process.env.NODE_ENV === "production", // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
  };
  const client = createClient(clientConfig);

  if (!password) {
    const data = await client.fetch(
      groq`*[_type=='patient'
          && medical_record_number =='${medicalRecordNumber}'
          ]`
    );
    console.log({ data });
  } else {
    const data = await client.fetch(
      groq`*[_type=='patient'
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
        }`
    );
    console.log({ data });
  }
  const res = await fetch(URL_PATIENT, options);
  console.log({ res });
  console.log({ res: await res.json() });
  if (res && res.status === 200) {
    const data = await res.json();

    return data;
  } else if (res.status === 404 || res.status === 403 || res.status === 405) {
    if (medicalRecordNumber === "US4234123398") {
      return {
        medical_record_number: "US4234123398",
        patient_profile: sampleProfile,
        scheduled_appointments: sampleSchedule,
        medical_records: [],
        notifications: sampleNotifications,
      };
    } else {
      return {};
    }
  } else {
    return {};
  }
}

// const res = await fetch(
//   URL_PATIENT,
//   // `${URL_PATIENT}?search=${medicalRecordNumber}&password=${password}`,
//   { cache: "no-store" }
// );
