import moment from "moment";
import { PatientType, UserType } from "../../patientTypes";
import { getPatients } from "@/sanity/sanityUtils/getPatients";

export const getUser = () => {
  let user: UserType = {
    login: false,
    password: "",
    medical_record_number: "",
  };

  let patient: PatientType = {
    medical_record_number: "",
    patient_profile: {
      name: "",
      NIK: "",
      address: "",
      sex: 1,
      birthdate: moment().format("YYYY-MM-DD[T]HH:mm"),
      phone: "",
      register_date: moment().format("YYYY-MM-DD[T]HH:mm"),
      password: "",
      bpjs_number: "",
    },
    scheduled_appointments: [],
    medical_records: [],
    notifications: [],
  };

  const getUserFromStorage = new Promise((resolve) => {
    return resolve(localStorage.getItem("user"));
  });

  const data = getUserFromStorage.then((res) => {
    if (res) {
      const data = JSON.parse(res.toString() || "");
      if (data && data.login) {
        const getPatientSanity = new Promise((resolve) => {
          resolve(getPatients(data.medical_record_number, data.password));
        });
        return getPatientSanity.then((res: any) => {
          if (!res || res.length < 1) {
            return { user, patient };
          } else {
            const patientSanity = res[0];
            user = data;
            patient = patientSanity;
            return { user, patient };
          }
        });
      }
    } else {
      return { user, patient };
    }
  });

  return data.then((res) => res);
};
