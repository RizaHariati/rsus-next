import React from "react";
import PatientEditDelete from "../adminpatientComponents/GeneralComponents/PatientEditDelete";
import { useGlobalContext } from "../../context/AppProvider";
import { CCO, OCC, OCO, OOC, OOO } from "../../column/columnPattern";
import { maxWidth, minWidth } from "../../context/initialState";

type Props = {
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const PatientSubMenu = ({ editable, setEditable, title }: Props) => {
  const {
    state: { columnAssignment, currentWindow },
    assignColumn,
  } = useGlobalContext();
  return (
    <div className={columnAssignment.column3 ? "submenu" : "submenu-rotate "}>
      <button
        onClick={() => {
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
          assignColumn(!columnAssignment.column3 ? fromClose : fromOpen);
        }}
        className={
          columnAssignment.column3
            ? "column-title border-r border-greyBorder"
            : "h-full w-fit flex items-center px-8 "
        }
      >
        <p className="sidebar-title ">{title}</p>
      </button>
      {columnAssignment.column3 && (
        <PatientEditDelete editable={editable} setEditable={setEditable} />
      )}
    </div>
  );
};

export default PatientSubMenu;
