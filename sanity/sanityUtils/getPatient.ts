import { initialPatientState } from "@/app/(tools)/context/initialPatientState";
import {
  sampleNotifications,
  sampleProfile,
  sampleSchedule,
} from "@/app/(tools)/data/sample";

export const runtime = "edge";

export async function getPatient(
  medicalRecordNumber: string,
  password?: string
): Promise<any[] | null> {
  const URL_PATIENT = "/api/patient/?";
  // process.env.NODE_ENV === "production"
  //   ? "https://rsuripsumoharjo-model.netlify.app/api?"
  //   : "/api?";
  // const res1 = await fetch("/api/");
  // console.log({ res1 });
  const res = await fetch(
    `${URL_PATIENT}search=${medicalRecordNumber}&password=${password}`
  );

  console.log({ res });
  // const body = {
  //   medicalRecordNumber,
  //   password,
  // };

  // const options: RequestInit = {
  //   method: "PUT",
  //   body: JSON.stringify(body),
  // };

  // const res = await fetch(URL_PATIENT, options);

  if (res && res.status === 200) {
    const data = await res.json();

    return data;
  } else if (res.status === 404 || res.status === 403 || res.status === 405) {
    if (medicalRecordNumber === "US4234123398") {
      return [
        {
          medical_record_number: "US4234123398",
          patient_profile: sampleProfile,
          scheduled_appointments: sampleSchedule,
          medical_records: [],
          notifications: sampleNotifications,
        },
      ];
    } else {
      return null;
    }
  } else {
    return [];
  }
}

// const body = {
//   medicalRecordNumber,
//   password,
// };

// const options: RequestInit = {
//   method: "PUT",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(body),
//   cache: "force-cache",
// };

// const res = await fetch(URL_PATIENT, options);
