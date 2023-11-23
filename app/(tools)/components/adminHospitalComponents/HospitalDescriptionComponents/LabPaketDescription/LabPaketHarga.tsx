import {
  HospitalItemType,
  LabPaketInitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import React, { useState } from "react";

type Props = {
  labPaketFormKey: string;
  labPaketFormValue: HospitalItemType;
  labPaketValues: LabPaketInitialValueType;
};

const LabPaketHarga = ({
  labPaketFormKey,
  labPaketFormValue,
  labPaketValues,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataPaket },
  } = useGlobalContext();
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.preventDefault);
    // console.log(e.target.value.slice(12, e.target.value.length));
  };
  const [selectedHarga, setSelectedHarga] = useState(null);
  const hargaCategory = [
    { id: "harga_1", type: "all" },
    { id: "harga_2", type: "pria" },
    { id: "harga_3", type: "wanita" },
  ];
  return (
    <div className="flex flex-col gap-2 mt-2">
      <small className="">{labPaketFormValue.title}</small>
      <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2 bg-transparent">
        {hargaCategory.map(({ type, id }) => {
          const findHarga = labPaketValues[labPaketFormKey].value.find(
            (item: any) => item.type === type
          );

          return (
            <div
              key={id}
              className=" w-full flex-center-left bg-purple-300 mr-auto h-10 standard-border bg-transparent "
            >
              <input
                type="radio"
                id={id}
                value={type}
                checked={findHarga?.type === type}
                className="w-12"
              />
              <label htmlFor={id} className="text-left w-24 cursor-pointer">
                {type}
              </label>
              <input
                value={findHarga ? findHarga.value : "-"}
                className="w-full h-full bg-white px-2 shadow-inner border-l border-greyBorder"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabPaketHarga;
