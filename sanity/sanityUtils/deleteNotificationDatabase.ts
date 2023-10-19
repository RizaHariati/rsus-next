import { writeClient } from "./sanity-utils";

import { NotificationType } from "../../app/(tools)/patientTypes";
import { getPatient } from "./getPatient";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_BASE_URL } from "../env";

export async function deleteNotificationDatabase(
  medicalRecordNumber: string,
  notificationID: string
) {
  const URL_NOTIFICATION = `${NEXT_PUBLIC_BASE_URL}/api/notification`;
  if (medicalRecordNumber === "US4234123398") return "sample data";
  else {
    const { data }: any = await getPatient(medicalRecordNumber, "");
    if (!data || Object.keys(data).length < 1) {
      return toast.error("terjadi kesalahan sistem");
    }

    const filterNotification = data.notifications.filter(
      (item: NotificationType) => item.id !== notificationID
    );

    const body1 = {
      _id: data._id,
      data: {
        ...data,
        notifications: filterNotification,
      },
    };

    const body2 = {
      _id: data._id,
      data: {
        ...data,
        notifications: [],
      },
    };

    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationID === "all" ? body2 : body1),
      cache: "no-store",
    };
    const response = await fetch(URL_NOTIFICATION, options);
    return response;
  }
}
