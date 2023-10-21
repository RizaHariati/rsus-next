import {
  sampleNotifications,
  sampleProfile,
  sampleSchedule,
} from "@/app/(tools)/data/sample";
import { NEXT_PUBLIC_BASE_URL } from "../env";

const URL_PATIENT = `${NEXT_PUBLIC_BASE_URL}/api/revalidate`;
export async function getPatient(
  medicalRecordNumber: string,
  password?: string
): Promise<any> {
  const body = {
    medicalRecordNumber,
    password,
  };
  const options: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const res = await fetch(URL_PATIENT, options);
  console.log({ resInGetPatient: res });
  return res;
}

// const res = await fetch(
//   URL_PATIENT,
//   // `${URL_PATIENT}?search=${medicalRecordNumber}&password=${password}`,
//   { cache: "no-store" }
// );

// console.log({ res });
// // console.log({ res: await res.json() });
// if (res && res.status === 200) {
//   const data = await res.json();

//   return data;
// } else if (res.status === 404 || res.status === 403 || res.status === 405) {
//   if (medicalRecordNumber === "US4234123398") {
//     return {
//       medical_record_number: "US4234123398",
//       patient_profile: sampleProfile,
//       scheduled_appointments: sampleSchedule,
//       medical_records: [],
//       notifications: sampleNotifications,
//     };
//   } else {
//     return res;
//   }
// } else {
//   return res;
// }
