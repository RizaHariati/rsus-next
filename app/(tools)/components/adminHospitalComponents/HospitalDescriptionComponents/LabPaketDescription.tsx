import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { labPaketForm } from "@/app/(tools)/utils/forms/LabPaketFormInput";

import React from "react";
type Props = {};

const LabPaketDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedPaket },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const formInputLabPaket = Object.entries(labPaketForm);
  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputLabPaket.map(([labPaketKey, labPaketValue], index) => {
          //@ts-ignore
          const labPaketDetail = selectedPaket?.[labPaketKey] || "";
          return (
            <div key={index} className="w-full">
              <small className="">{labPaketValue.title}</small>
              <input
                value={labPaketDetail.toString()}
                className={editable ? "admin-input" : "admin-input-disabled"}
              />
            </div>
          );
        })}
      </div>
      <div className="content-menu border-t">
        <button
          type="submit"
          className={
            editable ? "btn-base-focus px-12 " : "btn-base-small w-28 px-12"
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default LabPaketDescription;
