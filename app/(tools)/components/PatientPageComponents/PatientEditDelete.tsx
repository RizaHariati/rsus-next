import React from "react";

type Props = {
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
};

const PatientEditDelete = ({ editable, setEditable }: Props) => {
  return (
    <div className="content-menu ">
      <button
        onClick={() => {
          setEditable(!editable);
        }}
        type="button"
        className={editable ? "btn-base-focus " : "btn-base-small"}
      >
        Edit
      </button>
      <button
        onClick={() => setEditable(false)}
        type="button"
        className="btn-base-small"
      >
        Delete
      </button>
    </div>
  );
};

export default PatientEditDelete;
