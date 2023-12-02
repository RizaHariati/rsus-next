import { DoctorType, InitialValueType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { doctorForm } from "@/app/(tools)/utils/forms/DoctorDetailedForm";
import React, { useEffect, useState } from "react";
import DoctorHari from "./DoctorDescription/DoctorHari";

import DoctorWaktu from "./DoctorDescription/DoctorWaktu";
import DoctorTelemedicineInput from "./DoctorDescription/DoctorTelemedicineInput";
import BooleanButtonInput from "../../GeneralComponents/BooleanButtonInput";

import DoctorGender from "./DoctorDescription/DoctorGender";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import { toast } from "react-toastify";
import RegularInput from "../../GeneralComponents/RegularInput";

type Props = {};

const DoctorDescription = (props: Props) => {
  const {
    settingEditable,
    state: { columnAssignment, editable },
    hospitalState: { selectedDoctor, dataDoctor },
  } = useGlobalContext();

  const [doctorValues, setDoctorValues] = useState<InitialValueType>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPromise = new Promise((resolve) => {
      setTimeout(() => {
        let editedDoctor: DoctorType | any = {};
        Object.entries(doctorValues).forEach(([editedKey, editedValue]) => {
          if (!editedDoctor[editedKey]) {
            editedDoctor[editedKey] = editedValue.value;
          }
        });
        resolve(console.log({ editedDoctor }));
      }, 1000);
    }).then((res) => {
      settingEditable(false);
      return res;
    });
    toast.promise(newPromise, {
      pending: "Data diproses",
      success: "Data berhasil diubah",
      error: "Promise rejected 🤯",
    });
  };

  useEffect(() => {
    if (!selectedDoctor) return;
    else {
      const promiseDoctor = new Promise((resolve) => {
        let newDoctorValues: any = {};
        Object.entries(selectedDoctor).forEach(([key, value]) => {
          //@ts-ignore
          if (!newDoctorValues[key]) {
            //@ts-ignore
            newDoctorValues[key] = { value, error: false };
          }
        });

        resolve(newDoctorValues);
      });
      promiseDoctor.then((newDoctorValues: any) => {
        setDoctorValues(newDoctorValues);
      });

      if (!editable) {
        promiseDoctor.then((res: any) => {
          setDoctorValues(res);

          return res;
        });
      }
    }
  }, [selectedDoctor, editable]);

  const handleValueChange = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!doctorValues) return;
    const newDoctorValues: InitialValueType = {};
    const findTelemedicine = value.find((item) => item.key === "telemedicine");
    if (findTelemedicine) {
      if (findTelemedicine.newValue !== 1) {
        value.push(
          { newValue: 0, key: "biaya_telemedicine" },
          { newValue: 0, key: "sedang_online" }
        );
      } else {
        value.push(
          { newValue: 10000, key: "biaya_telemedicine" },
          { newValue: 0, key: "sedang_online" }
        );
      }
    }

    Object.entries(doctorValues).map(([itemKey, itemValue]) => {
      const findValue = value.find((item) => item.key === itemKey);
      if (!findValue) {
        //@ts-ignore
        newDoctorValues[itemKey] = { ...itemValue };
      } else {
        if (itemKey === "kuota" || itemKey === "pengalaman") {
          if (findValue.newValue > 100) {
            toast.info(`${itemKey} tidak boleh lebih dari 100`);
            newDoctorValues[itemKey] = { ...itemValue };
          } else {
            newDoctorValues[itemKey] = {
              value: findValue.newValue,
              error: false,
            };
          }
        } else {
          newDoctorValues[itemKey] = {
            value: findValue.newValue,
            error: false,
          };
        }
      }
      return "";
    });
    setDoctorValues(newDoctorValues);
    return;
  };
  const formInputDoctor = Object.entries(doctorForm);

  if (Object.keys(doctorValues).length < 1 || !selectedDoctor) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorDescriptionLoading />
      </div>
    );
  } else {
    return (
      <>
        <form
          className="column-description-container h-full flex items-start justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="column-description-content">
            {formInputDoctor.map(([doctorFormKey, doctorFormValue], index) => {
              //@ts-ignore
              const doctorDetail: any =
                doctorValues?.[doctorFormKey]?.value || "";
              switch (doctorFormKey) {
                case "hari":
                  return (
                    <DoctorHari
                      key={index}
                      doctorFormValue={doctorFormValue}
                      doctorValues={doctorValues}
                      handleValueChange={handleValueChange}
                    />
                  );
                case "telemedicine":
                case "biaya_telemedicine":
                case "sedang_online":
                  return (
                    <DoctorTelemedicineInput
                      key={index}
                      doctorFormKey={doctorFormKey}
                      doctorValues={doctorValues}
                      doctorFormValue={doctorFormValue}
                      handleValueChange={handleValueChange}
                    />
                  );

                case "waktu":
                  return (
                    <DoctorWaktu
                      key={index}
                      doctorFormKey={doctorFormKey}
                      doctorValues={doctorValues}
                      doctorFormValue={doctorFormValue}
                      handleValueChange={handleValueChange}
                    />
                  );
                case "gender":
                  return (
                    <DoctorGender
                      key={index}
                      doctorFormValue={doctorFormValue}
                      doctorDetail={doctorDetail}
                    />
                  );
                case "on_call":
                  return (
                    <div className="w-full" key={index}>
                      <small>{doctorFormValue.title}</small>
                      <BooleanButtonInput
                        booleanKey={doctorFormKey}
                        booleanValue={doctorDetail}
                        handleClick={handleValueChange}
                      />
                    </div>
                  );
                default:
                  return (
                    <RegularInput
                      key={index}
                      values={doctorValues}
                      formValue={doctorFormValue}
                      formKey={doctorFormKey}
                      handleValueChange={handleValueChange}
                    />
                  );
              }
            })}
          </div>
          <div className="content-menu border-t ">
            <button
              type="submit"
              className={
                editable
                  ? "btn-base-focus px-12 mx-0"
                  : "btn-base-small w-28 px-12 mx-0"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </>
    );
  }
};
// };

export default DoctorDescription;

// if (formKey === "biaya_telemedicine" || formKey === "biaya_tatapmuka") {
//   const newText = parseInt(text.toString());
//   if (newText < 10000) {
//     setText(10000);
//     sendValue = { ...sendValue, newValue: 10000 };
//   } else {
//     const newText = parseInt(text.toString());
//     const round = (num: number) => {
//       return Math.round(num / 500) * 500;
//     };
//     setText(round(newText));
//     sendValue = { ...sendValue, newValue: round(newText) };
//   }
// }
// if (formKey === "kuota") {
//   const newText = parseInt(text.toString());
//   if (newText < 5) {
//     setText(5);
//     sendValue = { ...sendValue, newValue: 5 };
//   }
// }
