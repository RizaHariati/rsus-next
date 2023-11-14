import { LabItemType, PaketLabType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const LabPaketMenu = (props: Props) => {
  const {
    hospitalState: { dataPaket, selectedPaket },
    settingEditable,
    selectLabPaket,
  } = useGlobalContext();

  return (
    <div className="midbar-container">
      {dataPaket.map((labPaket: PaketLabType, index: number) => {
        return (
          <button
            key={index}
            className={
              selectedPaket?.id === labPaket.id
                ? "sidebar-btn-focus group"
                : "sidebar-btn group"
            }
            onClick={() => {
              selectLabPaket(labPaket);
              settingEditable(false);
            }}
          >
            <div className="h-10 w-full flex flex-col">
              <small
                className={
                  selectedPaket?.id === labPaket.id
                    ? "sidebar-btn-text h-5 text-white "
                    : "sidebar-btn-text h-5 "
                }
              >
                {labPaket.title}
              </small>

              <small
                className={
                  selectedPaket?.id === labPaket.id
                    ? "sidebar-btn-text h-4 text-white"
                    : "sidebar-btn-text h-4"
                }
              >
                {labPaket.id}
              </small>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={
                selectedPaket?.id === labPaket.id
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

export default LabPaketMenu;
