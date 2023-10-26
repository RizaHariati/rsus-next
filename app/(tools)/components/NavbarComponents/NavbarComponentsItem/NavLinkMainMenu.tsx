"use client";

import React, { useState } from "react";

import { datamenu } from "@/app/(tools)/data/datamenu";
import { DataMenuType, SubDataType } from "@/app/(tools)/types";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOut,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import dataAppointment from "@/app/(tools)/data/data_appointment.json";
import { toast } from "react-toastify";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { clearStorageData } from "@/app/(tools)/utils/localData/clearStorageDate";

import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { getPatient } from "@/sanity/sanityUtils/getPatient";
import { NEXT_PUBLIC_BASE_URL } from "@/sanity/env";

type Props = {};
const URL_PATIENT = `${NEXT_PUBLIC_BASE_URL}/api/patient/?`;
const NavLinkMainMenu = (props: Props) => {
  const {
    toggleMenuNavbar,
    logout,
    state: { menu_id },
    patientState: { user, patient },
  } = useGlobalContext();

  const [itemId, setItemId] = useState<string | null>(null);
  const toggleItem = (id: string | null) => {
    if (itemId === id) {
      setItemId(null);
    } else {
      setItemId(id);
    }
  };

  const handleLogout = async () => {
    const loginNotification = patient.notifications.filter(
      (item) => item.notification_code === "ncat-001"
    );

    if (loginNotification.length > 1) {
      const logoutPatient = new Promise((resolve) => {
        return resolve(getPatient(patient.medical_record_number, ""));
      });

      const dataLogout = logoutPatient
        .then((res: any) => {
          const patientData = res;

          if (!patientData || Object.keys(patientData).length < 1) {
            return toast.error("terjadi kesalahan sistem");
          }
          const _id = patientData._id;
          const notifications = patientData.notifications;
          const filterNotifications = notifications.filter((item: any) => {
            const findNotif = loginNotification.find(
              (notifItem) => notifItem.id === item.id
            );
            if (!findNotif) return item;
          });

          const body = {
            _id: _id,
            key: "notifications",
            data: [...filterNotifications],
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

          const removingNotification = new Promise((resolve) => {
            resolve(fetch(URL_PATIENT, options));
          });
          removingNotification.then((response: any) => {
            return response;
          });
          return res;
        })
        .then((res) => {
          logout();
          clearStorageData();
          toggleMenuNavbar(null);
          return res;
        });
      toast.promise(dataLogout, {
        pending: "logging out patient...",
        success: "Terima kasih, semoga sehat selalu ",
      });
    } else {
      const processLogout = new Promise((resolve) => {
        resolve(
          setTimeout(() => {
            console.log("logging out");
          }, 1000)
        );
      });
      processLogout.then((res) => {
        logout();
        clearStorageData();
        toggleMenuNavbar(null);
        return res;
      });

      toast.promise(processLogout, {
        pending: "logging out patient...",
        success: "Terima kasih, semoga sehat selalu ",
      });
    }
  };
  return (
    <div className="flex-center-center text-link w-10 h-full relative ">
      <button
        type="button"
        id="main-menu"
        onClick={(e) => toggleMenuNavbar(e.currentTarget.id)}
      >
        <FontAwesomeIcon icon={faBars} className="navbar-reg-icon" />
      </button>

      {/* DROP MAIN MENU */}
      <div
        className={
          menu_id != "main-menu"
            ? "main-menu-container-hidden "
            : "main-menu-container "
        }
      >
        <div className="p-3 w-full h-full flex items-center gap-2 justify-end ">
          <a
            key="facebook"
            href="https://www.facebook.com/rs.sumoharjo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="h-8 text-blue-600 hover:text-greyMed1  transition-all"
            />
          </a>
          <a
            key="instagram"
            href="https://www.instagram.com/rs.uripsumoharjo.lampung/?hl=id"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="h-8 text-fuchsia-700 hover:text-greyMed1 transition-all"
            />
          </a>
          <Link
            href="/timer"
            className="bg-greyBorder hover:bg-greyMed1 transition-all border rounded-full flex-center-center h-8 w-8"
          >
            <FontAwesomeIcon icon={faStopwatch} className="h-5 text-white" />
          </Link>

          <Link
            href={
              process.env.NODE_ENV === "production"
                ? "https://rsus.sanity.studio/"
                : "/admin"
            }
            className="bg-white hover:border-greyMed1 transiti`on-all border border-accent1 rounded-full flex-center-center h-8 w-8  group"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="h-5 text-accent1  group-hover:text-greyMed1"
            />
          </Link>
        </div>
        <div className="flex flex-col ">
          {datamenu.map((menu: DataMenuType) => {
            if (menu.subdata.length > 0) {
              return (
                <SubMenu
                  menu={menu}
                  toggleItem={toggleItem}
                  itemId={itemId}
                  key={menu.title}
                  link={menu.link}
                />
              );
            } else {
              return (
                <div
                  className="bg-greyBorder h-12 flex items-center justify-end pl-2 "
                  key={menu.title}
                >
                  <Link
                    href={menu.link}
                    onClick={() => {
                      toggleMenuNavbar(null);
                      toggleItem(null);
                    }}
                    className="main-menu-item pt-3"
                  >
                    {menu.title}
                  </Link>
                </div>
              );
            }
          })}
        </div>
        <div className="w-full p-3 h-fit ">
          {user.login && (
            <button
              onClick={() => handleLogout()}
              //  if (newres && newres.length === loginNotification.length) {

              //       }
              className="flex-center-center gap-2 standard-border p-2 px-3  ml-auto bg-white hover:bg-greyLit active:bg-greyMed1 transition-all"
            >
              <FontAwesomeIcon icon={faSignOut} className="h-5" />
              <p className="body-2 text-greyMed1">Logout</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavLinkMainMenu;

type SubProps = {
  menu: DataMenuType;
  toggleItem: (id: string | null) => void;
  itemId: string | null;
  link: string;
};
const SubMenu = ({ menu, toggleItem, itemId, link }: SubProps) => {
  const {
    toggleMenuNavbar,
    openModal,
    state: { menu_id },
  } = useGlobalContext();
  return (
    <div className=" ">
      <div className="bg-greyBorder h-fit flex items-center justify-end pl-2 relative ">
        <button
          id={menu.name}
          onClick={(e) => {
            toggleItem(e.currentTarget.id);
          }}
          className={
            itemId != menu.name
              ? "main-menu-item w-full transition-all "
              : "main-menu-item text-right w-10/12 transition-all"
          }
        >
          {menu.title}
        </button>
      </div>
      <div
        className={
          itemId != menu.name
            ? "h-0 overflow-hidden w-full transition-all opacity-0"
            : " h-36 overflow-hidden w-full transition-all opacity-100"
        }
      >
        {menu.subdata.map((item: SubDataType, index) => {
          return (
            <div
              key={index}
              className="bg-greyBorder h-12 flex items-center justify-center "
            >
              <Link
                href={item.link ? item.link : link}
                onClick={() => {
                  toggleMenuNavbar(null);
                  toggleItem(null);
                  if (!item.link) {
                    openModal(
                      item.name,
                      dataAppointment.filter(
                        (appointmentItem) => appointmentItem.name === item.name
                      )[0]
                    );
                  }
                }}
                className="text-[14px] main-menu-item h-full text-center pt-4 "
              >
                {item.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
