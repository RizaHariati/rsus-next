import React, { useEffect, useState } from "react";

import { InitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { PatientItemType } from "@/app/(tools)/patientTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronCircleDown,
  faChevronUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getTujuan } from "@/app/(tools)/utils/patientUtils/getTujuan";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import moment from "moment";
import { allHari } from "@/app/(tools)/utils/AllHari";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

type Props = {
  formKey: string;
  values: InitialValueType;
  formValue: PatientItemType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

const ScheduleDestination = ({
  formKey,
  formValue,
  values,
  handleValueChange,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataFacility, dataDoctor, dataLabSatuan, dataPaket },
  } = useGlobalContext();
  const [showDestination, setShowDestination] = useState<string[]>(
    values[formKey].value
  );
  const [selectID, setSelectID] = useState<string | null>(null);
  const toggleId = (id: string) => {
    if (selectID === id) {
      setSelectID(null);
    } else {
      setSelectID(id);
    }
  };
  useEffect(() => {
    if (!values) return;

    setShowDestination(values[formKey].value);
    if (!editable) setShowDestination(values[formKey].value);
  }, [values, editable]);

  if (!showDestination) return <div></div>;
  const formDoctor = ["hari", "jam", "waktu", "poliklinik"];
  const formNonDoctor = [
    "id",
    "title",
    "description",
    "category",
    "pemeriksaan",
  ];
  return (
    <div className="w-full">
      <small>{formValue.title}</small>
      <button
        type="button"
        className="admin-input-disabled h-fit flex-center-between "
      >
        <p className="text-left text-greyMed2">
          {showDestination?.map((i: any) => i).join(", ")}
        </p>
        <FontAwesomeIcon
          icon={showDestination ? faChevronUp : faChevronCircleDown}
        />
      </button>
      <div className="w-full flex-center-center flex-col gap-2 mt-2">
        {showDestination.map((item: any, index: number) => {
          const data: any = getTujuan(
            item,
            dataFacility,
            dataPaket,
            dataLabSatuan,
            dataDoctor
          );

          return (
            <div
              key={index}
              className="standard-border bg-hoverBG w-full h-fit p-2"
            >
              <button
                onClick={() => toggleId(data.id)}
                type="button"
                className={
                  selectID === data.id
                    ? "admin-input flex-center-between"
                    : "admin-input flex-center-between text-greyMed2"
                }
              >
                <p
                  className={
                    selectID === data.id ? "text-greyDrk" : " text-greyMed2"
                  }
                >
                  {data.name || data.title}
                </p>
                <FontAwesomeIcon
                  icon={selectID === data.id ? faMinus : faPlus}
                />
              </button>
              {data.id.slice(0, 2) === "dr" && (
                <div
                  className={
                    selectID === data.id
                      ? "w-full h-fit overflow-hidden transition-all"
                      : "w-full h-0 overflow-hidden transition-all"
                  }
                >
                  {formDoctor.map((detailKey: string, detailIndex: number) => {
                    return (
                      <div className="w-full" key={detailIndex}>
                        <small className="">
                          {
                            //@ts-ignore
                            doctorForm[detailKey].title
                          }
                        </small>
                        <input
                          disabled={!formValue?.editable}
                          type={
                            formValue.number === false ? "string" : "number"
                          }
                          value={
                            detailKey === "poliklinik"
                              ? data[detailKey].title
                              : detailKey === "hari"
                              ? data[detailKey]
                                  .map(
                                    (i: any) =>
                                      allHari.find(
                                        (hari) => hari.id_hari === i["id_hari"]
                                      )!.hari
                                  )
                                  .join(", ")
                              : data[detailKey]
                          }
                          onChange={(e) => e.preventDefault()}
                          className="admin-input-disabled"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              {data.id.slice(0, 2) !== "dr" && (
                <div
                  className={
                    selectID === data.id
                      ? "w-full h-fit overflow-hidden transition-all"
                      : "w-full h-0 overflow-hidden transition-all"
                  }
                >
                  {formNonDoctor.map(
                    (detailKey: string, detailIndex: number) => {
                      if (!data[detailKey])
                        return <div key={detailIndex}></div>;
                      return (
                        <div className="w-full" key={detailIndex}>
                          <small className="">{detailKey}</small>
                          <input
                            disabled={!formValue?.editable}
                            type={
                              formValue.number === false ? "string" : "number"
                            }
                            value={
                              detailKey === "pemeriksaan"
                                ? data[detailKey]
                                    .slice(0, 4)
                                    .map((i: any) => i.title)
                                    .join(", ")
                                : data[detailKey]
                            }
                            onChange={(e) => e.preventDefault()}
                            className="admin-input-disabled capitalized"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleDestination;
