import {
  FacilityInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  facilityFormKey: string;
  facilityFormValue: HospitalItemType;
  facilityValues: FacilityInitialValueType;
};

const FacilityPoliklinik = ({
  facilityFormKey,
  facilityFormValue,
  facilityValues,
}: Props) => {
  const {
    state: { editable },
  } = useGlobalContext();
  return (
    <div className="w-full mt-2 bg-hoverBG">
      <small className="">{facilityFormValue.title}</small>
      <div className="w-full flex flex-col gap-2 standard-border p-2 bg-hoverBG">
        {facilityValues[facilityFormKey].value.map(
          (itemPoli: string, indexPoli: number) => {
            return (
              <div
                key={indexPoli}
                className={
                  editable
                    ? "admin-input flex-center-between"
                    : "admin-input-disabled flex-center-between"
                }
              >
                <p>{itemPoli}</p>
                <button className="standard-border h-6 w-6">
                  <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                </button>
              </div>
            );
          }
        )}

        <button
          type="button"
          className={
            editable
              ? "admin-input flex-center-center"
              : "admin-input-disabled flex-center-center"
          }
        >
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FacilityPoliklinik;
