import { toast } from "react-toastify";
import { getPatient } from "./getPatient";

import { NotificationType } from "@/app/(tools)/patientTypes";

export async function createNotification(
  medicalRecordNumber: string,
  newNotification: NotificationType & { _type: string; _key: string }
) {
  const URL_NOTIFICATION = "/api/notification";
  if (medicalRecordNumber === "US4234123398") return "sample data";
  else {
    const data = await getPatient(medicalRecordNumber, "");
    if (!data || data.length < 1)
      return toast.error("terjadi kesalahan sistem");
    const sendData = await data[0];
    const body = {
      _id: sendData._id,
      data: {
        ...sendData,
        notifications: [...(sendData.notifications || []), newNotification],
      },
    };

    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(URL_NOTIFICATION, options);
    return response;
  }
}
