import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { inpatientForm } from "@/app/(tools)/utils/forms/InpatientFormInput";
import InpatientImageDescription from "./InpatientDescription/InpatientImageDescription";
import { InitialValueType, InpatientType } from "@/app/(tools)/HospitalTypes";
import { useEffect, useState } from "react";
import EditListInput from "../../GeneralComponents/EditListInput";
import DoctorDescriptionLoading from "../HospitalLoadingComponents/DoctorDescriptionLoading";
import RegularInput from "../../GeneralComponents/RegularInput";
import { toast } from "react-toastify";

type Props = {};

const InpatientDescription = (props: Props) => {
  const {
    settingEditable,
    state: { editable },
    hospitalState: { selectedInpatient, dataInpatient },
  } = useGlobalContext();

  const [inpatientValues, setInpatientValues] = useState<InitialValueType>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPromise = new Promise((resolve) => {
      setTimeout(() => {
        let editedInpatient: InpatientType | any = {};
        Object.entries(inpatientValues).forEach(([editedKey, editedValue]) => {
          if (!editedInpatient[editedKey]) {
            editedInpatient[editedKey] = editedValue.value;
          }
        });
        resolve(console.log({ editedInpatient }));
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

    // masukkan data ke context
  };

  useEffect(() => {
    if (!selectedInpatient) return;
    else {
      let newFacilityValues: any = {};
      Object.entries(selectedInpatient).forEach(([key, value]) => {
        if (!newFacilityValues[key]) {
          //@ts-ignore
          newFacilityValues[key] = { value, error: false };
        }
      });
      setInpatientValues(newFacilityValues);
    }
  }, [selectedInpatient, editable]);

  const getInpatientFacility = () => {
    let inpatientFacilityList: { id: string; title: string }[] = [];
    if (!dataInpatient) return;
    else {
      let id = 0;
      dataInpatient.map((inpatientItem) => {
        inpatientItem.fasilitas.map((fasilitasItem) => {
          const findFacility = inpatientFacilityList.find(({ title }) => {
            // console.log({ title, fasilitasItem });
            return title === fasilitasItem;
          });
          if (!findFacility) {
            id++;
            inpatientFacilityList.push({
              id: `inp-${id}`,
              title: fasilitasItem,
            });
          }
          return "";
        });
        return "";
      });
    }
    return inpatientFacilityList;
  };
  const formInputInpatient = Object.entries(inpatientForm);

  const handleValueChange = (value: { newValue: any; key: string }[]) => {
    if (!editable) return;
    if (!inpatientValues) return;
    let newPatientValues: any = {};

    Object.entries(inpatientValues).map(([itemKey, itemValue]) => {
      if (!newPatientValues[itemKey]) {
        const findValue = value.find((item) => item.key === itemKey);

        if (!findValue) {
          newPatientValues[itemKey] = { ...itemValue };
        } else {
          if (itemKey === "fasilitas") {
            const newList: string[] = findValue.newValue.map(
              (item: any) => item.title
            );

            newPatientValues[itemKey] = {
              value: newList,
              error: false,
            };
          } else {
            newPatientValues[itemKey] = {
              value: findValue.newValue,
              error: false,
            };
          }
        }
      }
    });

    setInpatientValues(newPatientValues);
  };
  if (Object.keys(inpatientValues).length < 1 || !selectedInpatient) {
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <DoctorDescriptionLoading />
      </div>
    );
  } else {
    return (
      <form
        className="column-description-container "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="column-description-content">
          {formInputInpatient.map(
            ([inpatientFormKey, inpatientFormValue], index) => {
              switch (inpatientFormKey) {
                case "img":
                case "img-array":
                  return (
                    <InpatientImageDescription
                      key={index}
                      inpatientFormKey={inpatientFormKey}
                      inpatientFormValue={inpatientFormValue}
                      inpatientValues={inpatientValues}
                      handleValueChange={handleValueChange}
                    />
                  );
                case "fasilitas":
                  const dataList: { id: string; title: string }[] =
                    getInpatientFacility() || [];
                  const newInputList: { id: string; title: string }[] =
                    inpatientValues[inpatientFormKey].value.map(
                      (inpatientItem: string) => {
                        return dataList.find(
                          (item) => item.title === inpatientItem
                        );
                      }
                    );

                  return (
                    <EditListInput
                      key={index}
                      handleValueChange={handleValueChange}
                      FormKey={inpatientFormKey}
                      FormValue={inpatientFormValue}
                      inputList={newInputList}
                      dataList={dataList}
                    />
                  );
                default:
                  return (
                    <RegularInput
                      key={index}
                      formKey={inpatientFormKey}
                      formValue={inpatientFormValue}
                      values={inpatientValues}
                      handleValueChange={handleValueChange}
                    />
                  );
              }
            }
          )}
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
    );
  }
};

export default InpatientDescription;
