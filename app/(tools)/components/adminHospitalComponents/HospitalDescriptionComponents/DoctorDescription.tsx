import { DoctorInitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";
import { SatuanHariType, allHari } from "../../../utils/AllHari";
import { HariType } from "../../../HospitalTypes";

type Props = {};

const DoctorDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedDoctor },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [selectedHari, setSelectedHari] = useState(
    selectedDoctor ? selectedDoctor.hari : []
  );
  const [doctorValues, setDoctorValues] = useState<DoctorInitialValueType>({});
  // useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    patientKey: string
  ) => {
    e.preventDefault();
  };
  const formInputDoctor = Object.entries(doctorForm);
  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputDoctor.map(([doctorKey, doctorValue], index) => {
          //@ts-ignore
          const doctorDetail = selectedDoctor?.[doctorKey] || "";

          if (doctorKey === "hari") {
            return (
              <div key={index} className="w-full">
                <small className="">{doctorValue.title}</small>
                <div className="grid grid-cols-7 gap-2 place-items-center"></div>
                  {doctorDetail &&
                    allHari.map((hari: SatuanHariType) => {
                      const detailHari: HariType = selectedHari?.find(``
                        (detail) => detail.id_hari === hari.id_hari
                      );
                      console.log(detailHari);
                      return (
                        <button
                          index={hari.id_hari}
                          className={
                            detailHari
                              ? "hari-btn-active group"
                              : "hari-btn group"
                          }
                        >
                          <p className=" group-hover:text-white">{hari.hari}</p>
                          <small className=" group-hover:text-white">
                            kuota :
                            {detailHari
                              ? detailHari.kuota_terisi.toString()
                              : "-"}
                          </small>
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          }
          return (
            <div key={index} className="w-full">
              <small className="">{doctorValue.title}</small>
              <input
                value={doctorDetail.toString()}
                onChange={(e) => handleChange(e)}
                className={
                  editable && doctorValue.editable
                    ? "admin-input"
                    : "admin-input-disabled"
                }
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

export default DoctorDescription;
