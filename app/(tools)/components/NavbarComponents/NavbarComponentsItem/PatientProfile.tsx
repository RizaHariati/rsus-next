"use client";
import { getMedicalRecord } from "@/app/(tools)/data/sample";
import { patientFormInput } from "@/app/(tools)/utils/forms/patientFormInput";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getAge } from "@/app/(tools)/utils/getAge";
import "moment/locale/id";
import moment from "moment";
import { PatientProfileType, PatientType } from "@/app/(tools)/patientTypes";
type Props = {};

const PatientProfile = (props: Props) => {
  const {
    state: { menu_id },
  } = useGlobalContext();

  return (
    <div
      className={
        menu_id != "profile"
          ? "profile-menu-container-hidden "
          : "profile-menu-container"
      }
    >
      <PatientProfileContent />
    </div>
  );
};

export default PatientProfile;

export const PatientProfileContent = () => {
  const { toggleMenuNavbar, patientState } = useGlobalContext();
  const patient: PatientType = patientState.patient;
  if (!patient) return <div></div>;
  return (
    <>
      <h3>Profil Pasien</h3>
      <button
        className="absolute top-2 right-4"
        onClick={() => {
          toggleMenuNavbar(null);
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="grid grid-cols-2 md:grid-cols-3 col-start-1 gap-2 mb-2  px-5 md:px-0">
        <div className="w-full flex flex-col col-span-2">
          <p className="body-3 md:body-1-bold ">Nomor Rekam Medik (MR)</p>
          {patient.medical_record_number && (
            <p className="body-2 form-disable">
              {getMedicalRecord(patient.medical_record_number)}
            </p>
          )}
          <p className=" hidden md:block footnote-1 mt-2">
            Nomor Rekam Medis ini akan Anda perlukan saat mendaftar untuk
            berobat nanti, karenanya harap dicatat dengan baik.
          </p>
        </div>
      </div>
    </>
  );
};
