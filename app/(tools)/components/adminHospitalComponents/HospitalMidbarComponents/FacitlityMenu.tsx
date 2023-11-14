import { FacilitySanityType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type Props = {};

const FacilityMenu = (props: Props) => {
  const {
    hospitalState: { dataFacility, selectedFacility },
    settingEditable,
    selectFacility,
  } = useGlobalContext();
  console.log({ selectedFacility });
  return (
    <div className="midbar-container">
      {dataFacility.map((facility: FacilitySanityType, index: number) => {
        return (
          <button
            key={index}
            className={
              selectedFacility?.id === facility.id
                ? "sidebar-btn-focus group"
                : "sidebar-btn group"
            }
            onClick={() => {
              selectFacility(facility);
              settingEditable(false);
            }}
          >
            <Image
              rel="preload"
              placeholder="empty"
              src={
                facility?.img.src || "/images/navbar/main-logo.png?w=64&q=75"
              }
              width={40}
              height={40}
              className=" object-covers h-10 w-10 rounded-sm overflow-hidden mr-2"
              alt={facility?.img.alt || "altimage"}
              loading="lazy"
            />
            <div className="h-10 w-full flex flex-col">
              <small
                className={
                  selectedFacility?.id === facility.id
                    ? "sidebar-btn-text h-5 text-white "
                    : "sidebar-btn-text h-5 "
                }
              >
                {facility.title}
              </small>

              <small
                className={
                  selectedFacility?.id === facility.id
                    ? "sidebar-btn-text h-4 text-white"
                    : "sidebar-btn-text h-4"
                }
              >
                {facility.id}
              </small>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={
                selectedFacility?.id === facility.id
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

export default FacilityMenu;
