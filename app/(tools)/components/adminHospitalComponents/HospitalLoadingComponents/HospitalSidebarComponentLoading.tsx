import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  SidebarBtnType,
  hospitalBtnDetail,
} from "@/app/(tools)/column/sidebarColumnKeys";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

const HospitalSidebarComponentLoading = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    handleShowDetail,
    settingEditable,
    selectDoctor,
    selectFacility,
    selectLabSatuan,
    selectLabPaket,
    selectInpatient,
    state: {
      currentWindow,
      columnAssignment: { column1, column3 },
    },
    hospitalState: {
      dataDoctor,
      dataFacility,
      dataLabSatuan,
      dataPaket,
      dataInpatient,
    },
  } = useGlobalContext();
  return (
    <div
      className={
        !column1
          ? "column-container-rotate "
          : !column3
          ? "column-container "
          : "column-container-triple "
      }
    >
      <div
        className={
          column1
            ? "column-navbar-container"
            : "column-navbar-container-rotate "
        }
      >
        {/* ----------- this button is to change the column size ----------- */}
        <button
          className={
            !column1
              ? "column-navbar-main-btn-rotate"
              : "column-navbar-main-btn"
          }
        >
          Kategori
        </button>
      </div>
      {column1 && (
        <div className="column-sidebar-menu-container">
          {hospitalBtnDetail.map((item: SidebarBtnType, index: number) => {
            return (
              <div key={index} className="sidebar-btn-container">
                {/* ---------------- this button is submenu buttons ---------------- */}
                <button
                  className={
                    item.key === showDetail.key
                      ? "sidebar-btn-focus group"
                      : "sidebar-btn group"
                  }
                >
                  <p
                    className={
                      item.key === showDetail.key
                        ? "sidebar-btn-text text-white"
                        : "sidebar-btn-text"
                    }
                  >
                    {item.name}
                  </p>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={
                      item.key === showDetail.key
                        ? "sidebar-btn-icon text-white"
                        : "sidebar-btn-icon"
                    }
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HospitalSidebarComponentLoading;
