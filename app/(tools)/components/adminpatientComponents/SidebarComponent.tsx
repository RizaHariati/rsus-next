import React, { useCallback, useMemo } from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeSideBar, openSidebar } from "../../column/columnCodes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { patientBtnDetail } from "../../column/sidebarColumnKeys";

type Props = {};

const SidebarComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    handleShowDetail,
    settingEditable,
    state: {
      currentWindow,
      columnAssignment: { column1, column3 },
    },
    patientState: { patient },
  } = useGlobalContext();

  const handleSidebarColumn = () => {
    assignColumn(
      !column1 ? openSidebar(currentWindow) : closeSideBar(currentWindow)
    );
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
        <button
          onClick={() => handleSidebarColumn()}
          className={sidebarTheme.columnChangerBtn}
        >
          {patient.medical_record_number}
        </button>
      </div>
      {column1 && (
        <div className="column-sidebar-menu-container">
          {patientBtnDetail.map((item, index) => {
            return (
              <div key={index} className="sidebar-btn-container">
                <button
                  type="button"
                  className={sidebarButtonTheme(item.key).buttonBackground}
                  onClick={() => {
                    handleShowDetail(item);
                    settingEditable(false);
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

export default SidebarComponent;
