import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { PatientInitialValueType } from "../../patientTypes";

type Props = {
  newPatientPersonal: PatientInitialValueType;
  setNewPatientPersonal: React.Dispatch<
    React.SetStateAction<PatientInitialValueType>
  >;
};

const InputSex = ({ newPatientPersonal, setNewPatientPersonal }: Props) => {
  const [openSelection, setOpenSelection] = useState(false);
  const [selectedSex, setSelectedSex] = useState<1 | 0>(1);

  const handleSelect = (sexInput: number) => {
    if (sexInput !== 1 && sexInput !== 0) return;
    else {
      setSelectedSex(sexInput);
      setNewPatientPersonal({
        ...newPatientPersonal,
        sex: { value: sexInput, error: false },
      });
    }
    setOpenSelection(false);
  };
  return (
    <div className="col-span-2 md:col-span-1 relative w-full">
      <div>
        <p> Pilih Jenis Kelamin</p>
        <button
          type="button"
          onClick={() => setOpenSelection(!openSelection)}
          className="active-input text-left text-greyDrk"
        >
          {selectedSex ? "Pria" : "Wanita"}
        </button>
      </div>
      <div
        className={
          openSelection ? "gender-selection-open " : "gender-selection-closed "
        }
      >
        <button
          type="button"
          onClick={() => handleSelect(1)}
          className="flex-center-left gap-2 body-3"
        >
          <FontAwesomeIcon
            className={selectedSex ? "text-greenUrip" : "text-greyMed2"}
            icon={selectedSex ? faCircleDot : faCircle}
          />
          <p className={selectedSex ? "text-greenUrip" : "text-greyMed2"}>
            Pria
          </p>
        </button>
        <button
          type="button"
          onClick={() => handleSelect(0)}
          className="flex-center-left gap-2 body-3 "
        >
          <FontAwesomeIcon
            className={!selectedSex ? "text-greenUrip" : "text-greyMed2"}
            icon={!selectedSex ? faCircleDot : faCircle}
          />
          <p className={!selectedSex ? "text-greenUrip" : "text-greyMed2"}>
            Wanita
          </p>
        </button>
      </div>
    </div>
  );
};

export default InputSex;
