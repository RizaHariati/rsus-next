import { getMedicalRecord } from "@/app/(tools)/data/sample";
import { patientFormInput } from "@/app/(tools)/utils/forms/patientFormInput";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getAge } from "@/app/(tools)/utils/getAge";
type Props = {};

const PatientProfile = (props: Props) => {
  const {
    toggleMenuNavbar,
    state: { menu_id },
    patientState: { patientProfile },
  } = useGlobalContext();

  return (
    <div
      className={
        menu_id != "profile"
          ? "profile-menu-container-hidden "
          : "profile-menu-container"
      }
    >
      <h3>Profil Pasien</h3>
      <button
        className="absolute top-2 right-4"
        onClick={() => {
          toggleMenuNavbar(null);
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="grid grid-cols-3 col-start-1 gap-2 mb-2">
        <div className="w-full flex flex-col col-span-2">
          <p className="body-1-bold ">Nomor Rekam Medik (MR)</p>
          {patientProfile.medical_record_number && (
            <p className="body-2 form-disable">
              {getMedicalRecord(patientProfile.medical_record_number)}
            </p>
          )}
          <p className="footnote-1 mt-2">
            Nomor Rekam Medis ini akan Anda perlukan saat mendaftar untuk
            berobat nanti, karenanya harap dicatat dengan baik.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 col-start-1 gap-2 mb-2">
        {Object.entries(patientFormInput).map(([patientKey, patientValues]) => {
          const findPatient = Object.entries(patientProfile).find((item) => {
            return item[0] === patientKey;
          })!;

          return (
            <div
              key={patientValues.id}
              className={
                patientValues.id === "profil_1"
                  ? "w-full flex flex-col"
                  : "w-full flex flex-col"
              }
            >
              <p className="body-2 ">{patientValues.title}</p>
              {findPatient[0] !== "sex" && findPatient[0] !== "birthdate" && (
                <p className="active-input capitalize ">{findPatient[1]}</p>
              )}
              {findPatient[0] === "sex" && (
                <p className="active-input capitalize ">
                  {!findPatient[1] ? "wanita" : "pria"}
                </p>
              )}
              {findPatient[0] === "birthdate" && (
                <div className="active-input capitalize flex-center-between">
                  <p>{findPatient[1]}</p>
                  <p>
                    {`${getAge(findPatient[1].toString()).ageyear} thn/ ${
                      getAge(findPatient[1].toString()).agemonth
                    } bln`}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        {patientProfile.bpjs_number && (
          <div className="mt-2">
            <div className="w-full flex flex-col">
              <p className="body-2 ">Nomor BPJS</p>
              <p className="body-2 form-disable">
                {patientProfile?.bpjs_number}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
