import React from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeSideBar, openSidebar } from "../../column/columnCodes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { patientBtnDetail } from "../../column/sidebarColumn";

type Props = {};

const SidebarComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
    handleShowDetail,
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
        <button
          onClick={() => handleSidebarColumn()}
          className={
            !column1
              ? "column-navbar-main-btn-rotate"
              : "column-navbar-main-btn"
          }
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
                  className={
                    item.key === showDetail.key
                      ? "sidebar-btn-focus group"
                      : "sidebar-btn group"
                  }
                  onClick={() => {
                    handleShowDetail(item);
                    // if (currentWindow < minWidth) {
                    //   assignColumn(OCC);
                    // } else if (
                    //   currentWindow >= minWidth &&
                    //   currentWindow <= maxWidth
                    // ) {
                    //   assignColumn(OCO);
                    // } else {
                    //   assignColumn(OOO);
                    // }
                  }}
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

export default SidebarComponent;
