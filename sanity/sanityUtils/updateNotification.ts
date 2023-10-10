import { writeClient } from "./sanity-utils";
import PatientProfile from "../../app/(tools)/components/NavbarComponents/NavbarComponentsItem/PatientProfile";
import { NotificationType } from "../../app/(tools)/patientTypes";

const URL = "/api/patient";

export async function updateNotification(
  medicalRecordNumber: string,
  notificationID: string
) {
  if (medicalRecordNumber === "US4234123398") return "sample data";
  else {
    const fetchPatient: () => Promise<any[]> = () => {
      return writeClient.fetch(`*[_type=='patient'
  && medical_record_number =='${medicalRecordNumber}']`);
    };
    const data = await fetchPatient();
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
      const response = await fetch(URL, options);
      return response;
    }
  }
}
