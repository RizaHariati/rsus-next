import React from "react";
import { faCheckCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import NotificationMessages from "./NotificationMessages";
import { toast } from "react-toastify";
import moment from "moment";
import {
  NotificationLibraryType,
  NotificationType,
} from "@/app/(tools)/patientTypes";

import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { updateNotification } from "@/sanity/sanityUtils/updateNotification";

type Props = {
  notificationItem: NotificationType;
  findNotif: NotificationLibraryType;
  handleDeleteNotification: (
    medical_record_number: string,
    notificationItem: string
  ) => void;
};

const NotificationItem = ({
  notificationItem,
  findNotif,
  handleDeleteNotification,
}: Props) => {
  const {
    patientState: { patient },

    clearNotifBackground,
    deleteNotification,
  } = useGlobalContext();

  const handleMouseEnter = (notificationItem: NotificationType) => {
    if (notificationItem.seen) {
      return;
    } else {
      const updatingNotif = new Promise((resolve) => {
        return resolve(
          updateNotification(patient.medical_record_number, notificationItem.id)
        );
      });
      updatingNotif.then((res: any) => {
        if (res && res.status === 200) {
          console.log("clear");
        }
        clearNotifBackground(notificationItem.id);
      });
    }
  };
  return (
    <div
      className={
        notificationItem.seen
          ? "notification-item "
          : "notification-item bg-greyLit"
      }
    >
      <FontAwesomeIcon
        icon={findNotif.type === "success" ? faCheckCircle : faInfoCircle}
        className={
          findNotif.type === "success"
            ? "text-greenUrip col-span-1 p-1"
            : "text-blue-300 p-1"
        }
      />
      <button
        onPointerEnter={() => {
          handleMouseEnter(notificationItem);
        }}
        className=" col-span-10 inline leading-4 text-left"
      >
        <p className=" footnote-1 text-greyMed2">
          {moment(notificationItem.notification_date).format("DD MMMM YYYY")}
        </p>
        <NotificationMessages
          findNotif={findNotif}
          notificationItem={notificationItem}
        />
      </button>
      <button
        onClick={() => {
          handleDeleteNotification(
            patient.medical_record_number,
            notificationItem.id
          );
        }}
        className="col-span-1 hover:text-redBase active:text-redOpacity transition-all"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default NotificationItem;
