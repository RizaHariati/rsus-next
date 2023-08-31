import {
  getMedicalRecord,
  samplePatient,
} from "@/app/(tools)/data/samplePatient";
import { patientFormInput } from "@/app/(tools)/utils/forms/patientFormInput";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
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
      <h3>Profil Pasien</h3>
      <div className="grid grid-cols-3 col-start-1 gap-2 mb-2">
        <div className="w-full flex flex-col col-span-2">
          <p className="body-1-bold ">Nomor Rekam Medik (MR)</p>
          {samplePatient.medical_record_number && (
            <p className="body-2 form-disable">
              {getMedicalRecord(samplePatient.medical_record_number)}
            </p>
          )}
          <p className="footnote-1 mt-2">
            Nomor Rekam Medis ini akan Anda perlukan saat mendaftar untuk
            berobat nanti, karenanya harap dicatat dengan baik.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 col-start-1 gap-2 mb-2">
        {Object.entries(patientFormInput).map(([patientKey, patient]) => {
          return (
            <div
              key={patient.id}
              className={
                patient.id === "profil_1"
                  ? "w-full flex flex-col"
                  : "w-full flex flex-col"
              }
            >
              <p className="body-2 ">{patient.title}</p>
              {/* <p className="body-2 form-regular">
                  {typeof samplePatient.profile[patientKey] === "string"
                    ? samplePatient.profile[patientKey]
                    : !samplePatient.profile[patientKey]
                    ? "wanita"
                    : "pria"}
                </p> */}
            </div>
          );
        })}
        {samplePatient.bpjs && (
          <div className="mt-2">
            <div className="w-full flex flex-col">
              <p className="body-2 ">Nomor BPJS</p>
              <p className="body-2 form-disable">
                {samplePatient?.bpjs_number}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
