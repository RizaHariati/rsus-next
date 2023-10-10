import { writeClient } from "./sanity-utils";
import PatientProfile from "../../app/(tools)/components/NavbarComponents/NavbarComponentsItem/PatientProfile";

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

    const body = {
      _id: sendData._id,
      //   data: {
      //     ...sendData,
      //     notifications: [
      //       ...sendData.notifications.map((notif: any) => {
      //         if (notif.id === notificationID) {
      //           return { ...notif, seen: true };
      //         }
      //       }),
      //     ],
      //   },
    };

    const options: RequestInit = {
      method: "DELETE",
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
