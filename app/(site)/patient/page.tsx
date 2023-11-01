"use client";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const PatientPage = (props: Props) => {
  const {
    patientState: { patient },
  } = useGlobalContext();
  const Router = useRouter();
  useEffect(() => {
    console.log({ patient: !patient.medical_record_number });
    if (!patient || !patient.medical_record_number) {
      return Router.push("/");
    }
  }, [patient]);

  return (
    <main className="grid grid-cols-10 w-full h-full border-r border-greyBorder">
      <div className=" col-span-2 h-full w-full">Kolom keterangan</div>
      <div className="col-span-8 grid grid-cols-8  h-full w-full">
        Kolom satunya
      </div>
    </main>
  );
};

export default PatientPage;
