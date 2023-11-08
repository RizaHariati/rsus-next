import React, { useState } from "react";

import PatientSubMenu from "./PatientSubMenu";

type Props = {};

const PatientMedicalRecord = (props: Props) => {
  const [editable, setEditable] = useState(false);

  return (
    <div className=" w-full h-[calc(100vh-56px)]">
      <PatientSubMenu
        editable={editable}
        setEditable={setEditable}
        title="Rekam Medis"
      />

      <div className="w-full h-[calc(100vh-112px)] hidden md:flex-center-center ">
        <h4>Masih dalam konstruksi</h4>
      </div>
    </div>
  );
};

export default PatientMedicalRecord;
