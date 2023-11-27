import {
  HospitalItemType,
  LabPaketInitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  faCircle,
  faCircleDot,
  faRadio,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

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

  const [selectedHarga, setSelectedHarga] = useState(
    labPaketValues[labPaketFormKey].value
  );
  const [allType, setallType] = useState({
    all: true,
    wanita: true,
    pria: true,
  });
  useEffect(() => {}, []);

  const hargaCategory = [
    { id: "harga_1", type: "all" },
    { id: "harga_2", type: "pria" },
    { id: "harga_3", type: "wanita" },
  ];
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (e.currentTarget.id === "all") {
      const newValue = [{ type: "all", value: 550000 }];
      setallType({
        all: true,
        wanita: false,
        pria: false,
      });
      return setSelectedHarga(newValue);
    } else {
      const newValue = [
        { type: "pria", value: 100000 },
        { type: "wanita", value: 100000 },
      ];
      setallType({
        all: true,
        wanita: true,
        pria: true,
      });
      return setSelectedHarga(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <div className="flex flex-col gap-2 mt-2">
      <small className="">{labPaketFormValue.title}</small>
      <div className="w-full h-fit flex-center-center flex-col standard-border gap-2 p-2 bg-transparent">
        {hargaCategory.map((harga, index) => {
          const findHarga = selectedHarga.find(
            (item: any) => item.type === harga.type
          );
          return (
            <div
              key={index}
              className=" w-full flex-center-left bg-purple-300 mr-auto h-10 standard-border bg-transparent "
            >
              <button
                id={harga.type}
                onClick={(e) => handleClick(e)}
                className="text-left w-32 cursor-pointer` flex-center-start p-2 gap-2"
              >
                <FontAwesomeIcon
                  icon={findHarga?.type === harga.type ? faCircleDot : faCircle}
                  className="w-3 h-3 bg-greenUrip text-white rounded-full overflow-hidden border border-greenUrip"
                />
                <p> {harga.type}</p>
              </button>
              <input
                value={findHarga ? findHarga.value : "-"}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="w-full h-full bg-white px-2 shadow-inner border-l border-greyBorder"
              />
              ``
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabPaketHarga;
