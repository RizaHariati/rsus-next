import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { InpatientType } from "@/app/(tools)/HospitalTypes";
import Image from "next/image";
import myImageLoader from "@/loader";
type Props = {};

const InpatientMenu = (props: Props) => {
  const {
    hospitalState: { dataInpatient, selectedInpatient },
    settingEditable,
    selectInpatient,
  } = useGlobalContext();
  return (
    <div className="midbar-container">
      {dataInpatient.map((inpatient: InpatientType, index: number) => {
        return (
          <button
            key={index}
            className={
              selectedInpatient?.id === inpatient.id
                ? "sidebar-btn-focus group"
                : "sidebar-btn group"
            }
            onClick={() => {
              selectInpatient(inpatient);
              settingEditable(false);
            }}
          >
            <Image
              rel="preload"
              placeholder="empty"
              src={
                `/images/inpatient/thumbnails/${inpatient.img}` ||
                "/images/inpatient/thumbnails/kelas3-01.jpg"
              }
              width={40}
              height={40}
              quality={75}
              className=" object-covers h-10 w-10 rounded-sm overflow-hidden mr-2 shrink-0"
              alt={inpatient?.img || "altimage"}
              loading="lazy"
            />
            <div className="h-10 w-full flex flex-col">
              <small
                className={
                  selectedInpatient?.id === inpatient.id
                    ? "sidebar-btn-text h-5 text-white "
                    : "sidebar-btn-text h-5 "
                }
              >
                {inpatient.kelas}
              </small>

              <small
                className={
                  selectedInpatient?.id === inpatient.id
                    ? "sidebar-btn-text h-4 text-white"
                    : "sidebar-btn-text h-4"
                }
              >
                {inpatient.id}
              </small>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={
                selectedInpatient?.id === inpatient.id
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

export default InpatientMenu;
