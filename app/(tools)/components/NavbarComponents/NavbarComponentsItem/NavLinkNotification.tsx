import React from "react";
import {
  faBell,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { NotificationType } from "@/app/(tools)/patientTypes";
import dataNotification from "@/app/(tools)/data/data_notifications.json";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import MainLogoImage from "@/app/(tools)/modal/MainLogoImage";
import dayjs from "dayjs";
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
    patientState: { patient, user },
    state: { menu_id },
    toggleMenuNavbar,
  } = useGlobalContext();
  const notification: NotificationType[] = patient.notifications;

  return (
    <div className=" flex-center-center text-link w-12  h-full ">
      <div className="relative">
        {/* ---------------------- Notification button --------------------- */}
        <button
          type="button"
          id="nav-notification"
          onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
        >
          <FontAwesomeIcon icon={faBell} className="navbar-reg-icon" />
          {notification.length > 0 && (
            <div className="absolute bg-redBase w-5 min-w-fit aspect-square rounded-full -top-2 -right-3 flex-center-center p-0.5">
              <p className="text-white font-oswald text-xs text-center">
                {notification.length}
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
            <div className="flex-center-left px-5">
              <div className=" scale-50 origin-left">
                <MainLogoImage />
              </div>
              <h5>Notifikasi</h5>
            </div>
            <div className=" h-72 overflow-y-scroll scrollbar-none scrollbar-track-greyLit scrollbar-thumb-greyBorder border-y border-greyBorder px-5 pt-2">
              {notification.map((item) => {
                const findNotif = dataNotification.find(
                  (itemNotif) => itemNotif.id === item.notification_code
                )!;

                return (
                  <div
                    key={item.id}
                    className="w-full grid grid-cols-12 items-start standard-border mb-2 hover:bg-greyLit transition-all"
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
                    <div className=" col-span-10 inline leading-4">
                      <p className=" footnote-1 text-greyMed2">{item.date}</p>
                      {findNotif.message.map((message, index: number) => {
                        return (
                          <div key={index} className="inline body-3 leading-4">
                            {message}
                          </div>
                        );
                      })}
                    </div>
                    <button className="col-span-1 hover:text-redBase active:text-redOpacity transition-all">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationLogout = () => {
  return (
    <div className=" flex-center-center text-link w-12  h-full ">
      <div className="relative">
        <button type="button">
          <FontAwesomeIcon icon={faBell} className="navbar-reg-icon" />
        </button>
      </div>
    </div>
  );
};
