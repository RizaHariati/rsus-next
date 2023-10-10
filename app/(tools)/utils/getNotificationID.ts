import { NotificationType } from "../patientTypes";
import { addZeroString } from "./addZeroString";

export const getNotificationID = (notifications: NotificationType[]) => {
  let notificationID = "ntf-001";
  if (notifications.length > 0) {
    notificationID = addZeroString(notifications[notifications.length - 1].id);
  }

  return notificationID;
};
