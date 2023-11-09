import React from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeMidbar, openMidbar } from "../../column/columnCodes";

type Props = {};

const MidbarComponent = (props: Props) => {
  const {
    assignColumn,
    state: {
      currentWindow,
      columnAssignment: { column2, column3 },
    },
  } = useGlobalContext();
  const handleMidbarButton = () => {
    assignColumn(
      !column2 ? openMidbar(currentWindow) : closeMidbar(currentWindow)
    );
  };
  return (
    <div
      className={
        !column2
          ? "column-container-rotate    "
          : !column3
          ? "column-container "
          : "column-container-triple "
      }
    >
      <div
        className={
          column2
            ? "column-navbar-container"
            : "column-navbar-container-rotate "
        }
      >
        <button
          onClick={() => handleMidbarButton()}
          className={
            !column2
              ? "column-navbar-main-btn-rotate"
              : "column-navbar-main-btn"
          }
        >
          part of patient
        </button>
      </div>
      {column2 && (
        <div>
          <h4>mid menu</h4>
        </div>
      )}
    </div>
  );
};

export default MidbarComponent;
