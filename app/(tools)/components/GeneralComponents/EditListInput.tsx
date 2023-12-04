import { HospitalItemType } from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import DescriptionModal from "./DescriptionModal";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
  FormKey: string;
  FormValue: HospitalItemType;
  inputList: any[];
  dataList: any[];
};

const EditListInput = ({
  FormKey,
  FormValue,
  inputList,
  dataList,
  handleValueChange,
}: Props) => {
  const {
    state: { editable },
  } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState<any[]>(inputList);

  useEffect(() => {
    setList(inputList);
    if (!editable) closeModal();
    //eslint-disable-next-line
  }, [inputList, editable!]);

  const addRemoveListItem = (itemId: string) => {
    if (!editable) return;
    if (!dataList || !list) return;

    let finalList: any[] = [];
    const findList = list?.find((item) => item.id === itemId);

    if (!findList) {
      const newItem = dataList.find((item) => item.id === itemId);
      finalList = [...list, newItem];
    } else {
      if (list?.length < 2) return toast.error("Pilihan tidak boleh kosong");
      finalList = list?.filter((item: any) => item.id !== itemId);
    }

    handleValueChange([{ newValue: finalList, key: FormKey }]);
  };
  const closeModal = () => {
    setList(inputList);
    setShowModal(false);
  };
  if (!dataList || !list)
    return (
      <div className="h-[calc(100vh-112px)] w-full">
        <LoadingSpinner />
      </div>
    );
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
        {list.map((itemList: any, indexPoli: number) => {
          return (
            <div
              key={indexPoli}
              className={
                editable
                  ? "admin-input flex-center-between "
                  : "admin-input-disabled flex-center-between"
              }
            >
              <p className="text-sm leading-3">{itemList.title}</p>
              <button
                type="button"
                onClick={() => {
                  if (itemList.id.slice(0, 3) === "std")
                    return toast.info("Pemeriksaan standard harus disertakan");
                  addRemoveListItem(itemList.id);
                }}
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
