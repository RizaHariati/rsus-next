import { LabItemType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const LabSatuanMenu = (props: Props) => {
  const {
    hospitalState: { dataLabSatuan, selectedLabSatuan },
    settingEditable,
    selectLabSatuan,
  } = useGlobalContext();

  return (
    <div className="midbar-container">
      {dataLabSatuan.map((labSatuan: LabItemType, index: number) => {
        return (
          <button
            key={index}
            className={
              selectedLabSatuan?.id === labSatuan.id
                ? "sidebar-btn-focus group"
                : "sidebar-btn group"
            }
            onClick={() => {
              selectLabSatuan(labSatuan);
              settingEditable(false);
            }}
          >
            <div className="h-10 w-full flex flex-col">
              <p
                className={
                  selectedLabSatuan?.id === labSatuan.id
                    ? "sidebar-btn-text h-5 text-white "
                    : "sidebar-btn-text h-5 "
                }
              >
                {labSatuan.title}
              </p>

              <small
                className={
                  selectedLabSatuan?.id === labSatuan.id
                    ? "sidebar-btn-text h-4 text-white"
                    : "sidebar-btn-text h-4"
                }
              >
                {labSatuan.id}
              </small>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={
                selectedLabSatuan?.id === labSatuan.id
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

export default LabSatuanMenu;
