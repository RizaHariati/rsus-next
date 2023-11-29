import { faPenClip, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {};

const PatientEditDeleteLoading = ({}: Props) => {
  return (
    <div className="content-menu order-0 w-fit">
      <button type="button" className="btn-base-small ">
        <FontAwesomeIcon icon={faPenClip} className="btn-icon" />
        <p className="btn-text">Edit</p>
      </button>
      <button type="button" className="btn-base-small bg=white  group">
        <FontAwesomeIcon
          icon={faTrash}
          className="btn-icon group-focus:text-white "
        />
        <p className="btn-text">Delete</p>
      </button>
    </div>
  );
};

export default PatientEditDeleteLoading;
