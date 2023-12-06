import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { InpatientType } from "@/app/(tools)/HospitalTypes";
import { openDescription } from "@/app/(tools)/column/columnCodes";
import Image from "next/image";
import myImageLoader from "@/loader";

type Props = {};

const InpatientMenu = (props: Props) => {
  const {
    hospitalState: { dataInpatient, selectedInpatient },
    settingEditable,
    selectHospitalDescription,
    assignColumn,
    state: { currentWindow },
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
              selectHospitalDescription("inpatient", inpatient);
              assignColumn(openDescription(currentWindow));
              settingEditable(false);
            }}
          >
            <Image
              loader={myImageLoader}
              placeholder="empty"
              src={
                `/static/images/inpatient/thumbnails/${inpatient.img}?w=50` ||
                "/static/images/inpatient/thumbnails/kelas3-01.jpg"
              }
              width={50}
              height={50}
              className=" object-covers h-10 w-auto aspect-square rounded-sm overflow-hidden mr-2 shrink-0"
              alt={inpatient?.img.slice(0, -4) || "altimage"}
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
