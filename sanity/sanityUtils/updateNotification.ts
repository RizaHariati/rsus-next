import { writeClient } from "./sanity-utils";

import { NotificationType, PatientType } from "../../app/(tools)/patientTypes";
import { getPatient } from "./getPatient";
import { toast } from "react-toastify";

export async function updateNotification(
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
    const findNotification = sendData.notifications.find(
      (item: NotificationType) => item.id === notificationID
    );

    if (!findNotification) return "no notification found";
    else {
      const newNotification = { ...findNotification, seen: true };

      const body = {
        _id: sendData._id,
        data: {
          ...sendData,
          notifications: [
            ...sendData.notifications.map((data: NotificationType) => {
              if (data.id === notificationID) {
                return newNotification;
              } else {
                return data;
              }
            }),
          ],
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
}
