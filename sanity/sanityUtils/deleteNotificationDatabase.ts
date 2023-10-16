import { writeClient } from "./sanity-utils";

import { NotificationType } from "../../app/(tools)/patientTypes";
import { getPatient } from "./getPatient";
import { toast } from "react-toastify";

export async function deleteNotificationDatabase(
  medicalRecordNumber: string,
  notificationID: string
) {
  const URL_NOTIFICATION = "/api/notification";
  if (medicalRecordNumber === "US4234123398") return "sample data";
  else {
    const data = await getPatient(medicalRecordNumber, "");
    if (!data || data.length < 1)
      return toast.error("terjadi kesalahan sistem");
    const sendData = await data[0];
    const filterNotification = sendData.notifications.filter(
      (item: NotificationType) => item.id !== notificationID
    );

    const body1 = {
      _id: sendData._id,
      data: {
        ...sendData,
        notifications: filterNotification,
      },
    };

    const body2 = {
      _id: sendData._id,
      data: {
        ...sendData,
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
    };
    const response = await fetch(URL_NOTIFICATION, options);
    return response;
  }
}
