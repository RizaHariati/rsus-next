import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  SidebarBtnType,
  hospitalBtnDetail,
} from "@/app/(tools)/column/sidebarColumnKeys";

type Props = {
  column1: boolean;
  column3: boolean;
};

const HospitalSidebarComponentLoading = ({ column1, column3 }: Props) => {
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
                    item.key === "doctor"
                      ? "sidebar-btn-focus group"
                      : "sidebar-btn group"
                  }
                >
                  <p
                    className={
                      item.key === "doctor"
                        ? "sidebar-btn-text text-white"
                        : "sidebar-btn-text"
                    }
                  >
                    {item.name}
                  </p>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={
                      item.key === "doctor"
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
