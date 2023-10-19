import { toast } from "react-toastify";
import { getPatient } from "./getPatient";
import { NEXT_PUBLIC_BASE_URL } from "../env";

export async function deletePatient(medicalRecordNumber: string) {
  const URL_PATIENT = `${NEXT_PUBLIC_BASE_URL}/api/patient`;
  if (medicalRecordNumber === "US4234123398") return "sample data";
  else {
    const data = await getPatient(medicalRecordNumber, "");
    if (!data || data.length < 1)
      return toast.error("terjadi kesalahan sistem");
    const sendData = await data[0];

    const body = {
      _id: sendData._id,
    };

    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(URL_PATIENT, options);
    return response;
  }
}
