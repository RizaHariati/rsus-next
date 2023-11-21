import { DoctorType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import DoctorMenuLoading from "../HospitalLoadingComponents/DoctorMenuLoading";

type Props = {};

const DoctorMenu = (props: Props) => {
  const {
    hospitalState: { dataDoctor, selectedDoctor },
    settingEditable,
    selectDoctor,
  } = useGlobalContext();

  if (!dataDoctor) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorMenuLoading />
      </div>
    );
  }
  return (
    <div className="midbar-container">
      {dataDoctor.map((doctor: DoctorType, index: number) => {
        return (
          <button
            key={index}
            className={
              selectedDoctor?.id === doctor.id
                ? "sidebar-btn-focus group"
                : "sidebar-btn group"
            }
            onClick={() => {
              selectDoctor(doctor);
              settingEditable(false);
            }}
          >
            <div className="h-10 w-full flex flex-col">
              <small
                className={
                  selectedDoctor?.id === doctor.id
                    ? "sidebar-btn-text h-5 text-white "
                    : "sidebar-btn-text h-5 "
                }
              >
                {`Dr. ${doctor.name}`}
              </small>

              <small
                className={
                  selectedDoctor?.id === doctor.id
                    ? "sidebar-btn-text h-4 text-white"
                    : "sidebar-btn-text h-4"
                }
              >
                {doctor.poliklinik.title}
              </small>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={
                selectedDoctor?.id === doctor.id
                  ? "sidebar-btn-icon text-white"
                  : "sidebar-btn-icon"
              }
            />
          </button>
        );
      })}
    </div>
  );
};

export default DoctorMenu;
