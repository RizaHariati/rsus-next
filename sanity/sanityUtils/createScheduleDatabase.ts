import { ScheduledType } from "@/app/(tools)/patientTypes";

import { getPatient } from "./getPatient";
import { toast } from "react-toastify";

export async function createScheduleDatabase(
  medicalRecordNumber: string,
  newSchedule: ScheduledType[]
) {
  const URL_SCHEDULE = "/api/schedule";
  if (medicalRecordNumber === "US4234123398") return "sample data";
  const newSanitySchedule = newSchedule.map((item) => {
    return {
      ...item,
      _type: "array_of_schedule",
      _key: Math.floor(Math.random() * 1000000).toString(),
    };
  });
  const data = await getPatient(medicalRecordNumber, "");
  if (!data || data.length < 1) return toast.error("terjadi kesalahan sistem");
  const sendData = await data[0];
  const scheduled_appointments: any[] = [
    ...(sendData.scheduled_appointments || []),
    ...newSanitySchedule,
  ];
  const body = {
    _id: sendData._id,
    scheduled_appointments,
  };

  const options: RequestInit = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(URL_SCHEDULE, options);

  return response;
}
