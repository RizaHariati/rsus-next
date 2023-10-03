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
  messages: string[];
  findNotif: NotificationLibraryType;
  notificationItem: NotificationType;
};

const NotificationMessages = ({
  messages,
  findNotif,
  notificationItem,
}: Props) => {
  const {
    patientState: { patient },
  } = useGlobalContext();
  const patientprofile: PatientProfileType = patient.patient_profile;
  const patientSchedules: ScheduledType[] = patient.scheduled_appointments;
  // const schedule: ScheduledType = patientSchedules.find(
  //   (scheduleItem) =>
  //     scheduleItem.schedule_id === notificationItem.schedule_code || ""
  // )!;

  // const activities = getActivities(schedule);

  if (findNotif.category === "admin") {
    return (
      <div className="inline body-3 leading-4">
        {`${messages[0]} ${patientprofile.name}.
        ${messages[1]}
        ${
          dayjs(notificationItem?.notification_date).format(
            "DD-MM-YYYY [jam] HH:mm"
          ) || ""
        }.`}
      </div>
    );
  } else {
    if (findNotif.type === "success") {
      return (
        <div className="inline body-3 leading-4">
          {/* {`${messages[0]} ${
            activities.testActivities.length > 0
              ? activities.testActivities.map((item) => item.title).join(", ")
              : `${activities.doctorActivities.name}-poli ${activities.doctorActivities.poli}`
          }.
        ${messages[1]}  ${
            dayjs(schedule.scheduled_date).format("DD-MM-YYYY [jam] HH:mm") ||
            ""
          }.   ${messages[2] || ""}`} */}
        </div>
      );
    } else {
      return (
        <div className="inline body-3 leading-4">
          {/* {`${messages[0]} ${
            activities.testActivities.length > 0
              ? activities.testActivities.map((item) => item.title).join(", ")
              : `${activities.doctorActivities.name}-poli ${activities.doctorActivities.poli}`
          }.
        ${messages[1]}  ${messages[2] || ""}`} */}
        </div>
      );
    }
  }
};

export default NotificationMessages;
