"use client";
import { COC, OCC, OCO, OOC, OOO } from "@/app/(tools)/column/columnPattern";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { maxWidth, minWidth } from "@/app/(tools)/context/initialState";
import React from "react";
import { CCO, COO } from "../../(tools)/column/columnPattern";
import useAssignColumn from "@/app/(tools)/utils/useAssignColumn";

type Props = {};

const PatientPage = (props: Props) => {
  useAssignColumn();
  const {
    assignColumn,
    state: {
      currentWindow,
      columnAssignment: { column1, column2, column3 },
    },
  } = useGlobalContext();
  const handleSidebarColumn = () => {
    const fromClose =
      currentWindow < minWidth
        ? CCO
        : currentWindow >= minWidth && currentWindow <= maxWidth
        ? OCO
        : OOO;
    const fromOpen =
      currentWindow < minWidth
        ? OCC
        : currentWindow >= minWidth && currentWindow <= maxWidth
        ? OOC
        : OOO;
    assignColumn(!column3 ? fromClose : fromOpen);
  };

  const handleDescriptionButton = () => {
    const fromClose =
      currentWindow < minWidth
        ? CCO
        : currentWindow >= minWidth && currentWindow <= maxWidth
        ? OCO
        : OOO;
    const fromOpen =
      currentWindow < minWidth
        ? OCC
        : currentWindow >= minWidth && currentWindow <= maxWidth
        ? OOC
        : OOO;
    assignColumn(!column3 ? fromClose : fromOpen);
  };

  const handleMidbarButton = () => {
    const fromClose =
      currentWindow < minWidth
        ? COC
        : currentWindow >= minWidth && currentWindow <= maxWidth
        ? COO
        : OOO;
    const fromOpen =
      currentWindow < minWidth
        ? OCC
        : currentWindow >= minWidth && currentWindow <= maxWidth
        ? OCO
        : OOO;
    assignColumn(!column2 ? fromClose : fromOpen);
  };
  return (
    <div className="ptn-container">
      <div className="ptn-content">
        {/* --------------------- COLUMN 1 SIDEBAR MENU -------------------- */}
        <div
          className={
            !column1
              ? "h-full w-14 xs:w-20 bg-yellow-300 shrink-0"
              : !column3
              ? "h-full w-full bg-yellow-300"
              : "h-full w-full md:w-column md:shrink-0 bg-yellow-300"
          }
        >
          <div>
            <button onClick={() => handleSidebarColumn()}>
              patient number
            </button>
          </div>
          {column1 && (
            <div>
              <h4>sidebar menu</h4>
            </div>
          )}
        </div>
        {/* ----------------------- COLUMN 2 MID MENU ---------------------- */}
        <div
          className={
            !column2
              ? "h-full w-14 xs:w-20 bg-orange-300  shrink-0"
              : !column3
              ? "h-full w-full  bg-orange-300"
              : "h-full w-full  md:w-column md:shrink-0 bg-orange-300"
          }
        >
          <div>
            <button onClick={() => handleMidbarButton()}>
              part of patient
            </button>
          </div>
          {column2 && (
            <div>
              <h4>mid menu</h4>
            </div>
          )}
        </div>
        {/* ----------------- COLUMN 3 DETAILED DESCRIPTION ---------------- */}
        <div
          className={
            !column3
              ? "h-full w-14 xs:w-20 bg-red-300  shrink-0"
              : "h-full w-full bg-red-300"
          }
        >
          <div>
            <button onClick={() => handleDescriptionButton()}>
              detailed part
            </button>
            {column3 && <div>edit and such button</div>}
          </div>
          {column3 && (
            <div>
              <h4>detailed description</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
