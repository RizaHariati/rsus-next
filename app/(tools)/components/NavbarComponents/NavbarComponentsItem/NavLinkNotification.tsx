import React from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  NotificationLibraryType,
  NotificationType,
} from "@/app/(tools)/patientTypes";
import dataNotification from "@/app/(tools)/data/data_notifications.json";
import MainLogoImage from "@/app/(tools)/modal/MainLogoImage";
import { toast } from "react-toastify";
import NotificationItem from "./NotificationItem";
import { deleteNotificationDatabase } from "@/sanity/sanityUtils/deleteNotificationDatabase";
type Props = {};

const NavLinkNotification = (props: Props) => {
  const {
    patientState: { user },
  } = useGlobalContext();
  if (!user.login) {
    return <NotificationLogout />;
  } else {
    return <NotificationLogin />;
  }
};

export default NavLinkNotification;

const NotificationLogin = () => {
  const {
    patientState: { patient },
    state: { menu_id },
    toggleMenuNavbar,
    deleteNotification,
  } = useGlobalContext();
  const notification: NotificationType[] = patient.notifications;

  const handleDeleteNotification = (
    medical_record_number: string,
    notificationItem: string
  ) => {
    const deleting = new Promise((resolve) => {
      toast.info("menghapus notifikasi");
      resolve(
        deleteNotificationDatabase(medical_record_number, notificationItem)
      );
    });

    deleting.then((res: any) => {
      if (res && res.status === 200) {
        toast.success("notifikasi berhasil dihapus");
      }
      deleteNotification(notificationItem);
    });
  };
  if (!patient) return <div></div>;
  else {
    return (
      <div className=" flex-center-center text-link w-12  h-full ">
        <div className="relative">
          {/* ---------------------- Notification button --------------------- */}
          <button
            type="button"
            id="nav-notification"
            onClick={(e) => {
              toggleMenuNavbar(e.currentTarget.id);
              if (notification.length < 1) {
                toast.info("belum ada pesan baru untuk anda");
              }
            }}
          >
            <FontAwesomeIcon icon={faBell} className="navbar-reg-icon" />
            {notification.filter((item) => item.seen === false).length > 0 && (
              <div className="absolute bg-redBase w-5 min-w-fit aspect-square rounded-full -top-2 -right-3 flex-center-center p-0.5">
                <p className="text-white font-oswald text-xs text-center">
                  {notification.filter((item) => item.seen === false).length}
                </p>
              </div>
            )}
          </button>

          {/* ----------------------- Notiication List ----------------------- */}

          {notification.length > 0 && (
            <div
              className={
                menu_id != "nav-notification"
                  ? "notification-container-hidden "
                  : "notification-container  "
              }
            >
              <div className="flex-center-between ">
                <div className="flex-center-left">
                  <div className=" scale-50 origin-left">
                    <MainLogoImage />
                  </div>
                  <h5>Notifikasi</h5>
                </div>
                <button
                  onClick={() => {
                    handleDeleteNotification(
                      patient.medical_record_number,
                      "all"
                    );
                  }}
                  className=" standard-border btn-3 px-2 hover:text-black transition-all active:bg-greyMed2 active:text-white"
                >
                  hapus semua
                </button>
              </div>
              <div className=" h-fit max-h-[400px] overflow-y-scroll scrollbar-none scrollbar-track-greyLit scrollbar-thumb-greyBorder standard-border border-greyBorder p-2 ">
                {notification
                  .slice()
                  .reverse()
                  .map((notificationItem, index) => {
                    const findNotif: NotificationLibraryType | undefined =
                      dataNotification.find(
                        (itemNotif: NotificationLibraryType) =>
                          itemNotif.id === notificationItem.notification_code
                      );

                    if (!findNotif) {
                      return <div key={index}></div>;
                    } else {
                      return (
                        <NotificationItem
                          key={index}
                          notificationItem={notificationItem}
                          findNotif={findNotif}
                          handleDeleteNotification={handleDeleteNotification}
                        />
                      );
                    }
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

const NotificationLogout = () => {
  const {
    patientState: { user },
    toggleMenuNavbar,
  } = useGlobalContext();
  return (
    <div className=" flex-center-center text-link w-12 h-full ">
      <div className="relative">
        <button
          onClick={() => {
            if (!user.login) {
              toast.error("Anda harus login terlebih dahulu");
            }
            toggleMenuNavbar(null);
          }}
          type="button"
        >
          <FontAwesomeIcon icon={faBell} className="navbar-reg-icon" />
        </button>
      </div>
    </div>
  );
};
