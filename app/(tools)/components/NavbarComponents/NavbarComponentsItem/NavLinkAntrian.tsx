"use client";

import React from "react";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faPeopleGroup,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ScheduledType } from "@/app/(tools)/patientTypes";
import { getActivities } from "@/app/(tools)/utils/getActivities";
import { DoctorType } from "@/app/(tools)/types";
import { toast } from "react-toastify";

type Props = {};

const NavLinkAntrian = () => {
  const {
    toggleMenuNavbar,
    state: { menu_id },
    patientState: { patient, user },
  } = useGlobalContext();
  const schedule: ScheduledType[] = patient.scheduled_appointments;
  return (
    <div className="relative h-full ">
      <button
        type="button"
        id="antrian"
        onClick={(e) => {
          if (!user.login) {
            toast.error("Anda harus login terlebih dahulu");
          } else {
            toggleMenuNavbar(e.currentTarget.id);
          }
        }}
        className="navbar-link  "
      >
        <FontAwesomeIcon icon={faPeopleGroup} className="navbar-link-icon" />
        <p className="text-link">Antrian</p>
      </button>

      {/* DROP MENU ANTRIAN */}
      {user.login && (
        <div
          className={
            menu_id != "antrian"
              ? "antrian-menu-container-hidden "
              : "antrian-menu-container "
          }
        >
          {schedule?.map((scheduleItem) => {
            const activities = getActivities(scheduleItem);
            const { doctorActivities, testActivities } = activities;
            if (testActivities.length > 0) {
              return (
                <div key={scheduleItem.schedule_id}>
                  {testActivities.map((item, index) => {
                    return (
                      <div key={index} className="menu-alert mb-2">
                        <FontAwesomeIcon
                          icon={faTriangleExclamation}
                          className="menu-icon text-blue-700"
                        />
                        <div>
                          <p className="capitalize font-semibold">
                            {scheduleItem.appointment_type}
                          </p>
                          <p className="body-3 ">
                            {item.title}: Saat ini melayani nomor 25. &nbsp;
                            <span className="font-bold">
                              Nomor Anda {scheduleItem.nomor_antrian}
                            </span>
                            . Harap bersiap-siap
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              const doctor: DoctorType = doctorActivities.doctor!;
              return (
                <div key={scheduleItem.schedule_id} className="menu-alert">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="menu-icon text-greenUrip "
                  />
                  {scheduleItem.appointment_type === "telemedicine" ? (
                    <div>
                      <p className="capitalize font-semibold">
                        {scheduleItem.appointment_type}
                      </p>
                      <p className="body-3 ">
                        {doctor.poliklinik.title}: {doctor.nama} Saat ini akan
                        segera menghubungi anda via WhatsApp. Harap bersiap-siap
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="capitalize font-semibold">
                        {scheduleItem.appointment_type}
                      </p>
                      <p className="body-3 ">
                        {doctor.poliklinik.title}: {doctor.nama} Saat ini
                        melayani nomor 10. &nbsp;
                        <span className="font-bold">
                          Nomor Anda {scheduleItem.nomor_antrian}
                        </span>
                        . Harap bersiap-siap
                      </p>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default NavLinkAntrian;

//         <div className="menu-alert">
//           <FontAwesomeIcon
//             icon={faTriangleExclamation}
//             className="menu-icon "
//           />
//           <p className="body-3 ">
//             Dr. Mamie (Poli Anak): Saat ini melayani nomor 10.
//             <span className="font-bold">Nomor Anda 20</span>. Harap bersiap-siap
//           </p>
//         </div>

//         <div className="menu-info">
//           <FontAwesomeIcon icon={faInfo} className="menu-icon " />
//           <p className="body-3 ">
//             Farmasi : Saat ini melayani nomor 48 racikan, nomor 34 non racikan.
//             <span className="font-bold">Nomor Anda 67 non racikan</span>.
//           </p>
//         </div>
