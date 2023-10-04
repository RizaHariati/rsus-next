import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  NotificationLibraryType,
  NotificationType,
  ScheduledType,
} from "@/app/(tools)/patientTypes";
import React from "react";
import { PatientProfileType } from "../../../patientTypes";
import dayjs from "dayjs";
import { getActivities } from "@/app/(tools)/utils/getActivities";

type Props = {
  findNotif: NotificationLibraryType;
  notificationItem: NotificationType;
};

const NotificationMessages = ({ findNotif, notificationItem }: Props) => {
  const {
    patientState: { patient },
  } = useGlobalContext();
  const patientprofile: PatientProfileType = patient.patient_profile;

  if (findNotif.category === "admin") {
    return (
      <div className="inline body-3 leading-4">
        {`${findNotif.message[0]} ${patientprofile.name}.
        ${findNotif.message[1]}
        ${
          dayjs(notificationItem?.notification_date).format(
            "DD-MM-YYYY [jam] HH:mm"
          ) || ""
        }.`}
      </div>
    );
  } else {
    return (
      <div className="inline body-3 leading-4">
        {notificationItem.message &&
          notificationItem.message.map((item: string, index: number) => {
            return <p key={index}>{item}</p>;
          })}
      </div>
    );
  }
};

export default NotificationMessages;
