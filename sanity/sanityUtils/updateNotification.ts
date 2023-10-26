import { writeClient } from "./sanity-utils";

import { NotificationType, PatientType } from "../../app/(tools)/patientTypes";
import { getPatient } from "./getPatient";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_BASE_URL } from "../env";

export async function updateNotification(
  medicalRecordNumber: string,
  notificationID: string
) {
  const URL_NOTIFICATION = `${NEXT_PUBLIC_BASE_URL}/api/patient`;
  if (medicalRecordNumber === "US4234123398") return "sample data";
  else {
    const data: any = await getPatient(medicalRecordNumber, "");

    if (!data || Object.keys(data).length < 1) {
      return toast.error("terjadi kesalahan sistem");
    }

    const findNotification = data.notifications.find(
      (item: NotificationType) => item.id === notificationID
    );

    if (!findNotification) return "no notification found";
    else {
      const newNotification = { ...findNotification, seen: true };

      const body = {
        _id: data._id,
        data: {
          ...data,
          notifications: [
            ...data.notifications.map((dataNotif: NotificationType) => {
              if (dataNotif.id === notificationID) {
                return newNotification;
              } else {
                return dataNotif;
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
          cache: "no-store",
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(URL_NOTIFICATION, options);
      return response;
    }
  }
}
