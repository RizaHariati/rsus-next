import { toast } from "react-toastify";
import { getPatient } from "./getPatient";

import { NotificationType } from "@/app/(tools)/patientTypes";
import { NEXT_PUBLIC_BASE_URL } from "../env";

export async function createNotification(
  medicalRecordNumber: string,
  newNotification: NotificationType & { _type: string; _key: string }
) {
  const URL_NOTIFICATION = `${NEXT_PUBLIC_BASE_URL}/api/notification`;
  if (medicalRecordNumber === "US4234123398") return "sample data";
  else {
    const { data }: any = await getPatient(medicalRecordNumber, "");

    if (!data || Object.keys(data).length < 1) {
      return toast.error("terjadi kesalahan sistem");
    }

    const body = {
      _id: data._id,
      data: {
        ...data,
        notifications: [...(data.notifications || []), newNotification],
      },
    };

    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        cache: "no-store",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(URL_NOTIFICATION, options);

    return response;
  }
}
