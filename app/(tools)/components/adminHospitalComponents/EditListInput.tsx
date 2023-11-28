import {
  FacilityInitialValueType,
  HospitalItemType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import DescriptionModal from "./DescriptionModal";
import { toast } from "react-toastify";

type Props = {
  handleChangeValue: (value: { newValue: any; key: string }[]) => void;
  FormKey: string;
  FormValue: HospitalItemType;
  inputList: string[];
  dataList: any[];
};

const EditListInput = ({
  FormKey,
  FormValue,
  inputList,
  dataList,
  handleChangeValue,
}: Props) => {
  const {
    state: { editable },
  } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState<any[]>(inputList);

  useEffect(() => {
    setList(inputList);
  }, [inputList, editable!]);

  const addRemoveListItem = useCallback(
    (itemList: string) => {
      if (!editable) return;
      if (list.length < 2) return toast.error("Pilihan tidak boleh kosong");
      let finalList: any[] = [];
      const findList = list.find((item) => item === itemList);

      if (!findList) {
        const newList = [...list, itemList];

        finalList = newList.map((item) => {
          const findItem = dataList.find(
            (itemdata) => itemdata.title.toLowerCase() === item.toLowerCase()
          );
          if (findItem) {
            return findItem;
          }
        });
        setList(newList);
      } else {
        const newList = list.filter((item: string) => item !== itemList);
        finalList = newList.map((item) => {
          const findItem = dataList.find(
            (itemdata) => itemdata.title.toLowerCase() === item.toLowerCase()
          );
          if (findItem) {
            return findItem;
          }
        });
        setList(newList);
      }
      handleChangeValue([{ newValue: finalList, key: FormKey }]);
    },
    [list, setList, FormKey, dataList, editable, handleChangeValue]
  );
  const closeModal = () => {
    setList(inputList);
    setShowModal(false);
  };

  return (
    <div className="w-full mt-2 bg-hoverBG">
      <DescriptionModal
        showModal={showModal}
        closeModal={closeModal}
        dataList={dataList}
        list={list}
        addRemoveListItem={addRemoveListItem}
      />
      <small className="">{FormValue.title}</small>
      <div className="w-full flex flex-col gap-2 standard-border p-2 bg-hoverBG">
        {list.map((itemList: string, indexPoli: number) => {
          return (
            <div
              key={indexPoli}
              className={
                editable
                  ? "admin-input flex-center-between "
                  : "admin-input-disabled flex-center-between"
              }
            >
              <p className="text-sm leading-3">{itemList}</p>
              <button
                type="button"
                onClick={() => addRemoveListItem(itemList)}
                className="standard-border h-6 w-6"
              >
                <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
              </button>
            </div>
          );
        })}

        <button
          onClick={() => {
            if (!editable) return;
            setShowModal(!showModal);
          }}
          type="button"
          className={
            editable
              ? "admin-input flex-center-center"
              : "admin-input-disabled flex-center-center"
          }
        >
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default EditListInput;
