import React from "react";
import {
  faBell,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  NotificationLibraryType,
  NotificationType,
} from "@/app/(tools)/patientTypes";
import dataNotification from "@/app/(tools)/data/data_notifications.json";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import MainLogoImage from "@/app/(tools)/modal/MainLogoImage";
import NotificationMessages from "./NotificationMessages";
import { toast } from "react-toastify";
import moment from "moment";
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
    clearNotifBackground,
    deleteNotification,
  } = useGlobalContext();
  const notification: NotificationType[] = patient.notifications;

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
                  deleteNotification("all");
                  toast.success("pesan berhasil dihapus");
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
                      <div
                        key={index}
                        className={
                          notificationItem.seen
                            ? "notification-item "
                            : "notification-item bg-greyLit"
                        }
                      >
                        <FontAwesomeIcon
                          icon={
                            findNotif.type === "success"
                              ? faCheckCircle
                              : faInfoCircle
                          }
                          className={
                            findNotif.type === "success"
                              ? "text-greenUrip col-span-1 p-1"
                              : "text-blue-300 p-1"
                          }
                        />
                        <button
                          onPointerEnter={() => {
                            if (notificationItem.seen) {
                              return;
                            } else {
                              clearNotifBackground(notificationItem.id);
                            }
                          }}
                          className=" col-span-10 inline leading-4 text-left"
                        >
                          <p className=" footnote-1 text-greyMed2">
                            {moment(notificationItem.notification_date).format(
                              "DD MMMM YYYY"
                            )}
                          </p>
                          <NotificationMessages
                            findNotif={findNotif}
                            notificationItem={notificationItem}
                          />
                        </button>
                        <button
                          onClick={() => {
                            deleteNotification(notificationItem.id);
                            toast.success("pesan berhasil dihapus");
                          }}
                          className="col-span-1 hover:text-redBase active:text-redOpacity transition-all"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
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
