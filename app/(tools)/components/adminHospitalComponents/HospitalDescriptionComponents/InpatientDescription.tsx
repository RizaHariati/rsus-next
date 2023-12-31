import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { inpatientForm } from "@/app/(tools)/utils/forms/InpatientFormInput";
import InpatientImageDescription from "./InpatientDescription/InpatientImageDescription";
import { InitialValueType, InpatientType } from "@/app/(tools)/HospitalTypes";
import { useEffect, useState } from "react";
import EditListInput from "../../GeneralComponents/EditListInput";
import RegularInput from "../../GeneralComponents/RegularInput";
import { toast } from "react-toastify";
import { validatePrice } from "@/app/(tools)/utils/forms/validatePrice";
import SubmitButton from "../../GeneralComponents/SubmitButton";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import data_inpatient from "../../../data/data_inap.json";
type Props = {};

const InpatientDescription = (props: Props) => {
  const {
    updateHospital,
    settingEditable,
    settingEditAlert,
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

        resolve(updateHospital("inpatient", editedInpatient));
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

    let id = 0;
    data_inpatient.map((inpatientItem) => {
      inpatientItem.fasilitas.map((fasilitasItem) => {
        const findFacility = inpatientFacilityList.find(({ title }) => {
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
          } else if (itemKey === "harga") {
            const validate = validatePrice(findValue.newValue, 20000000);
            if (!validate.flag) {
              newPatientValues[itemKey] = {
                ...itemValue,
                value: validate.roundup,
              };
            } else {
              newPatientValues[itemKey] = { ...itemValue };
            }
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
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <form
        className="column-description-container "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div
          className="column-description-content"
          onClick={() => settingEditAlert()}
        >
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
        <SubmitButton />
      </form>
    );
  }
};

export default InpatientDescription;
