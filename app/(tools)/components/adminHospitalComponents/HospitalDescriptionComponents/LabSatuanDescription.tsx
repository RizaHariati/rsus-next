import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { labSatuanForm } from "@/app/(tools)/utils/forms/LabSatuanFormInput";
import React from "react";

type Props = {};

const LabSatuanDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedLabSatuan },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const formInputLabSatuan = Object.entries(labSatuanForm);
  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputLabSatuan.map(([labSatuanKey, labSatuanValue], index) => {
          //@ts-ignore
          const labSatuanDetail = selectedLabSatuan?.[labSatuanKey] || "";
          return (
            <div key={index} className="w-full">
              <small className="">{labSatuanValue.title}</small>
              <input
                value={labSatuanDetail.toString()}
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

export default LabSatuanDescription;
