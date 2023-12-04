import React, { useMemo } from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeMidbar, openMidbar } from "../../column/columnCodes";
import PatientScheduleMenu from "./MidbarComponents/PatientScheduleMenu";

type Props = {};

const MidbarComponent = (props: Props) => {
  const {
    assignColumn,
    showDetail,
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

  const midbarTheme = useMemo(() => {
    return {
      columnContainer: !column2
        ? "column-container-rotate "
        : !column3
        ? "column-container "
        : "column-container-triple ",
      columnNavbarContainer: column2
        ? "column-navbar-container"
        : "column-navbar-container-rotate ",
      columnChangerBtn: !column2
        ? "column-navbar-main-btn-rotate"
        : "column-navbar-main-btn",
    };
  }, [column2, column3]);
  return (
    <div className={midbarTheme.columnContainer}>
      <div className={midbarTheme.columnNavbarContainer}>
        <button
          type="button"
          onClick={() => handleMidbarButton()}
          className={midbarTheme.columnChangerBtn}
        >
          {showDetail.column_open === "all"
            ? showDetail.name
            : "part of patient"}
        </button>
      </div>
      {column2 && (
        <div>
          {showDetail.key === "scheduled_appointments" && (
            <PatientScheduleMenu />
          )}
        </div>
      )}
    </div>
  );
};

export default MidbarComponent;
