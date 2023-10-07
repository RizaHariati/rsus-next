"use client";
import { getMedicalRecord } from "@/app/(tools)/data/sample";
import { patientFormInput } from "@/app/(tools)/utils/forms/patientFormInput";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getAge } from "@/app/(tools)/utils/getAge";
import "moment/locale/id";
import moment from "moment";
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
  const {
    toggleMenuNavbar,
    patientState: { patient },
  } = useGlobalContext();

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
      <div className="grid grid-cols-1 md:grid-cols-3 col-start-1 gap-1 md:gap-2 mb-1 md:mb-2  px-5 md:px-0">
        {Object.entries(patientFormInput).map(([patientKey, patientValues]) => {
          const findPatient = Object.entries(patient.patient_profile).find(
            (item) => {
              return item[0] === patientKey;
            }
          )!;
          const [key, value] = findPatient;

          return (
            <div
              key={patientValues.id}
              className={
                patientValues.id === "profil_1"
                  ? "w-full flex flex-col"
                  : "w-full flex flex-col"
              }
            >
              <p className="body-3 md:body-2 ">{patientValues.title}</p>
              {key !== "sex" && key !== "birthdate" && (
                <p
                  className={
                    key === "bpjs_number"
                      ? "dark-input capitalize "
                      : "active-input capitalize "
                  }
                >
                  {value.toString()}
                </p>
              )}
              {key === "sex" && (
                <p className="active-input capitalize ">
                  {!value ? "wanita" : "pria"}
                </p>
              )}
              {key === "birthdate" && (
                <div className="active-input capitalize flex-center-between">
                  <p>{moment(value).locale("id").format("DD MMMM YYYY")}</p>
                  <p>
                    {`${getAge(value).ageyear} thn/ ${getAge(value).agemonth}
                    bln`}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
