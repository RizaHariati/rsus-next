import { ScheduledType } from "@/app/(tools)/patientTypes";

import { getPatient } from "./getPatient";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_BASE_URL } from "../env";

export async function createScheduleDatabase(
  medicalRecordNumber: string,
  newSchedule: ScheduledType[]
) {
  const URL_PATIENT = `${NEXT_PUBLIC_BASE_URL}/api/patient/`;
  if (medicalRecordNumber === "US4234123398") return "sample data";
  const newSanitySchedule = newSchedule.map((item) => {
    return {
      ...item,
      _type: "array_of_schedule",
      _key: Math.floor(Math.random() * 1000000).toString(),
    };
  });
  const data: any = await getPatient(medicalRecordNumber, "");

  if (!data || Object.keys(data).length < 1) {
    return toast.error("terjadi kesalahan sistem");
  }

  const scheduled_appointments: any[] = [
    ...(data.scheduled_appointments || []),
    ...newSanitySchedule,
  ];
  const body = {
    _id: data._id,
    key: "scheduled_appointments",
    data: scheduled_appointments,
  };

  const options: RequestInit = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(URL_PATIENT, options);

  return response;
}
