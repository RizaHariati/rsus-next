import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faPenClip, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {};

const PatientEditDelete = ({}: Props) => {
  const {
    state: { editable },
    settingEditable,
  } = useGlobalContext();
  return (
    <div className="content-menu ">
      <button
        onClick={() => settingEditable(!editable)}
        type="button"
        className={editable ? "btn-base-focus " : "btn-base-small"}
      >
        <FontAwesomeIcon
          icon={faPenClip}
          className={editable ? "btn-icon-focus " : "btn-icon"}
        />
        <p className={editable ? "btn-text-focus" : "btn-text"}>Edit</p>
      </button>
      <button
        onClick={() => settingEditable(false)}
        type="button"
        className="btn-base-small"
      >
        <FontAwesomeIcon icon={faTrash} className="btn-icon" />
        <p className="btn-text">Delete</p>
      </button>
    </div>
  );
};

export default PatientEditDelete;
