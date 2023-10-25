import moment from "moment";
import { NotificationType, PatientType, UserType } from "../../patientTypes";
import { getNotificationID } from "../../utils/getNotificationID";
import { createNotification } from "@/sanity/sanityUtils/createNotification";

export const loginUser = (patient: PatientType, data: any) =>
  new Promise((resolve) => {
    let newNotification: NotificationType & { _type: string; _key: string } = {
      id: getNotificationID(patient.notifications || []),
      notification_code: "ncat-001",
      notification_date: moment().format("YYYY-MM-DD[T]HH:mm"),
      seen: false,
      _type: "array_of_notifications",
      _key: Math.floor(Math.random() * 1000000).toString(),
    };
    return resolve(
      createNotification(data.medical_record_number, newNotification)
    );
  });

export const loadingPatient = (patient: any, resNotif: any) => {
  if (patient && Object.keys(patient).length > 0) {
    let user: UserType = {
      login: true,
      password: patient.patient_profile.password,
      medical_record_number: patient.medical_record_number,
    };
    if (resNotif.status === 204) {
      const { id, notification_code, notification_date, seen } = resNotif.data;
      const newNotification = {
        id,
        notification_code,
        notification_date,
        seen,
      };
      patient = {
        ...patient,
        notifications: [
          ...(patient.notifications || []),
          {
            ...newNotification,
          },
        ],
      };
    }
    return { user, patient };
  }
  return console.log("patient not found");
};
