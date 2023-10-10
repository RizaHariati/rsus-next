import { writeClient } from "./sanity-utils";
import { NotificationType } from "@/app/(tools)/patientTypes";

const URL = "/api/patient";

export async function createNotification(
  medicalRecordNumber: string,
  newNotification: NotificationType & { _type: string; _key: string }
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
    const response = await fetch(URL, options);
    return response;
  }
}
