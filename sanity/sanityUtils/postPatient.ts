import { PatientType } from "../../app/(tools)/patientTypes";
import { NEXT_PUBLIC_BASE_URL } from "../env";

const URL_PATIENT = `${NEXT_PUBLIC_BASE_URL}/api/patient`;
export const postPatient = async (patient: PatientType) => {
  const body = {
    _type: "patient",
    ...patient,
    notifications: [
      ...patient.notifications.map((item) => {
        return {
          _type: "array_of_notifications",
          ...item,
          _key: Math.floor(Math.random() * 1000000).toString(),
        };
      }),
    ],
  };

  const options: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(URL_PATIENT, options);

  return response;
};
