import { toast } from "react-toastify";
import { getPatient } from "./getPatient";

import { NotificationType } from "@/app/(tools)/patientTypes";
import { NEXT_PUBLIC_BASE_URL } from "../env";
import { NextResponse } from "next/server";
import { getNotificationID } from "@/app/(tools)/utils/getNotificationID";

export async function createNotification(
  medicalRecordNumber: string,
  newNotification: NotificationType & { _type: string; _key: string }
) {
  const URL_PATIENT = `${NEXT_PUBLIC_BASE_URL}/api/patient/`;
  if (medicalRecordNumber === "US4234123398") {
    return NextResponse.json({
      status: 204,
      message: "sample data",
      data: newNotification,
    });
  } else {
    const patientData: any = await getPatient(medicalRecordNumber, "");

    if (!patientData || Object.keys(patientData).length < 1) {
      return toast.error("terjadi kesalahan sistem");
    }
    const newID = getNotificationID(patientData.notifications || []);
    const notification = { ...newNotification, id: newID };
    const body = {
      _id: patientData._id,
      key: "notifications",
      data: [...(patientData.notifications || []), notification],
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
    const response = await fetch(URL_PATIENT, options);

    return response;
  }
}
