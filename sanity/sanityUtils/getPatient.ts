import {
  sampleNotifications,
  sampleProfile,
  sampleSchedule,
} from "@/app/(tools)/data/sample";
import { NEXT_PUBLIC_BASE_URL } from "../env";
import { SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const URL_PATIENT = `${NEXT_PUBLIC_BASE_URL}/api/patient/?`;
export async function getPatient(
  medicalRecordNumber: string,
  password?: string
): Promise<any> {
  const res = await fetch(
    `${URL_PATIENT}id=${medicalRecordNumber}&password=${password}`
    // {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization:
    //       "Bearer skOuTPWYzAeqk7ISYYWNtxpmhpbzmmDh1e1VZPLA1VWpSGufmcHLXtbSwrgHRboQu706ofMkRfApPVF2nUMEAnkaKu3lsuvnDDQTSuALJ7DmuXL3zUVOcn8ei1UjgDKnDGHUv8iDSCdH4RwDXTUFbVZaIuosoguVI9lJCt5gxjbsc16u0zgb",
    //   },
    // }
  );

  if (res && res.status === 200) {
    const { data } = await res.json();

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
      return null;
    }
  } else {
    return null;
  }
}
