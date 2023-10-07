import { PatientType } from "../../app/(tools)/patientTypes";

const URL = "/api/patient";
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

  const response = await fetch(URL, options)
    .then((res) => res)
    .catch((err) => console.log(err));

  return response;
};
