"use client";
import React, { useCallback, useMemo } from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeSideBar, openSidebar } from "../../column/columnCodes";
import {
  SidebarBtnType,
  hospitalBtnDetail,
} from "../../column/sidebarColumnKeys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const HospitalSidebarComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    handleShowDetail,
    settingEditable,
    selectHospitalDescription,
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

  const handleSidebarColumn = () => {
    assignColumn(
      !column1 ? openSidebar(currentWindow) : closeSideBar(currentWindow)
    );
  };

  const handleClick = (key: SidebarBtnType) => {
    assignColumn(closeSideBar(currentWindow));
    handleShowDetail(key);
    switch (key.key) {
      case "doctor":
        selectHospitalDescription("doctor", dataDoctor?.[0]);
        break;
      case "facility":
        selectHospitalDescription("facility", dataFacility?.[0]);
        break;
      case "lab_satuan":
        selectHospitalDescription("lab_satuan", dataLabSatuan?.[0]);
        break;
      case "lab_paket":
        selectHospitalDescription("lab_paket", dataPaket?.[0]);
        break;
      case "inpatient":
        selectHospitalDescription("inpatient", dataInpatient?.[0]);
        break;
      default:
        break;
    }

    settingEditable(false);
  };

  const sidebarTheme = useMemo(() => {
    return {
      columnContainer: !column1
        ? "column-container-rotate "
        : !column3
        ? "column-container "
        : "column-container-triple ",
      columnNavbarContainer: column1
        ? "column-navbar-container"
        : "column-navbar-container-rotate ",
      columnChangerBtn: !column1
        ? "column-navbar-main-btn-rotate"
        : "column-navbar-main-btn",
    };
  }, [column1, column3]);

  const sidebarButtonTheme = useCallback(
    (itemKey: string) => {
      return {
        buttonBackground:
          itemKey === showDetail.key
            ? "sidebar-btn-focus group"
            : "sidebar-btn group",
        buttonText:
          itemKey === showDetail.key
            ? "sidebar-btn-text text-white"
            : "sidebar-btn-text",
        buttonIcon:
          itemKey === showDetail.key
            ? "sidebar-btn-icon text-white"
            : "sidebar-btn-icon",
      };
    },
    [showDetail]
  );
  return (
    <div className={sidebarTheme.columnContainer}>
      <div className={sidebarTheme.columnNavbarContainer}>
        {/* ----------- this button is to change the column size ----------- */}
        <button
          onClick={() => handleSidebarColumn()}
          className={sidebarTheme.columnChangerBtn}
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
                  className={sidebarButtonTheme(item.key).buttonBackground}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  <p className={sidebarButtonTheme(item.key).buttonText}>
                    {item.name}
                  </p>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={sidebarButtonTheme(item.key).buttonIcon}
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

export default HospitalSidebarComponent;
