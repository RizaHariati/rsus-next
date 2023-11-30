import React, { useMemo } from "react";
import { useGlobalContext } from "../../context/AppProvider";
import { closeMidbar, openMidbar } from "../../column/columnCodes";
import DoctorMenu from "./HospitalMidbarComponents/DoctorMenu";
import FacilityMenu from "./HospitalMidbarComponents/FacitlityMenu";
import LabSatuanMenu from "./HospitalMidbarComponents/LabSatuanMenu";
import LabPaketMenu from "./HospitalMidbarComponents/LabPaketMenu";
import InpatientMenu from "./HospitalMidbarComponents/InpatientMenu";
type Props = {};

const HospitalMidbarComponent = (props: Props) => {
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
          {showDetail.key === "doctor" && <DoctorMenu />}
          {showDetail.key === "facility" && <FacilityMenu />}
          {showDetail.key === "lab_satuan" && <LabSatuanMenu />}
          {showDetail.key === "lab_paket" && <LabPaketMenu />}
          {showDetail.key === "inpatient" && <InpatientMenu />}
        </div>
      )}
    </div>
  );
};

export default HospitalMidbarComponent;
