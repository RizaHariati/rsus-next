import { PatientType } from "../../app/(tools)/patientTypes";

const URL_PATIENT = "/api/patient";
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
  console.log({ response });
  return response;
};
