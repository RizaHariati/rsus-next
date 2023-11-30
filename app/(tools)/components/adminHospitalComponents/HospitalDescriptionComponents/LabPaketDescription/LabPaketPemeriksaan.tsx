import {
  HospitalItemType,
  InitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  labPaketFormKey: string;
  labPaketFormValue: HospitalItemType;
  labPaketValues: InitialValueType;
};

const LabPaketPemeriksaan = ({
  labPaketFormKey,
  labPaketFormValue,
  labPaketValues,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataPaket },
  } = useGlobalContext();
  return (
    <div className="flex flex-col gap-2 mt-2">
      <small className="">{labPaketFormValue.title}</small>
      <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2 bg-transparent">
        {labPaketValues[labPaketFormKey].value.map(({ id, title }: any) => {
          // const findHarga = labPaketValues[labPaketFormKey].value.find(
          //   (item: any) => item.type === type
          // );

          return (
            <div
              key={id}
              className={
                editable
                  ? "admin-input flex-center-between"
                  : "admin-input-disabled flex-center-between"
              }
            >
              <p>{title}</p>
              <button className="standard-border h-6 w-6">
                <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

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
  );
};

export default LabPaketPemeriksaan;
