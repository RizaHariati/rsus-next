import {
  HospitalItemType,
  InitialValueType,
} from "@/app/(tools)/HospitalTypes";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import {
  faCircle,
  faCircleDot,
  faRadio,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  labPaketFormKey: string;
  labPaketFormValue: HospitalItemType;
  labPaketValues: InitialValueType;
  handleValueChange: (value: { newValue: any; key: string }[]) => void;
};

type PaketHargaType = { type: "all" | "pria" | "wanita"; value: number }[];
const LabPaketHarga = ({
  labPaketFormKey,
  labPaketFormValue,
  labPaketValues,
  handleValueChange,
}: Props) => {
  const {
    state: { editable },
    hospitalState: { dataPaket },
  } = useGlobalContext();

  const hargaCategory = [
    { id: "harga_1", type: "all" },
    { id: "harga_2", type: "pria" },
    { id: "harga_3", type: "wanita" },
  ];

  const [selectedHarga, setSelectedHarga] = useState<PaketHargaType>(
    labPaketValues?.[labPaketFormKey]?.value || [{ type: "all", value: 550000 }]
  );
  useEffect(() => {
    if (!editable)
      return setSelectedHarga(labPaketValues?.[labPaketFormKey]?.value);
    setSelectedHarga(labPaketValues?.[labPaketFormKey]?.value);
  }, [labPaketValues, editable]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!editable) return;
    let newValue: PaketHargaType = selectedHarga;
    if (e.currentTarget.id === "all") {
      newValue = [{ type: "all", value: 550000 }];
    } else {
      newValue = [
        { type: "pria", value: 100000 },
        { type: "wanita", value: 100000 },
      ];
    }
    handleValueChange([{ newValue, key: labPaketFormKey }]);
    return setSelectedHarga(newValue);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    e.preventDefault();

    const findType = selectedHarga.find((item) => item.type === type);
    if (!findType) return;
    const newHarga: any = selectedHarga.map((item) => {
      if (type === item.type) {
        return { ...item, value: parseInt(e.target.value) };
      } else {
        return item;
      }
    });
    setSelectedHarga(newHarga);
  };
  const registerValue = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    type: string
  ) => {
    e.preventDefault();

    const findType = selectedHarga.find((item) => item.type === type);

    if (!findType) return;
    const newText = e.target.value;
    if (!newText) {
      toast.error("harga tidak boleh kosong");

      return setSelectedHarga([...labPaketValues?.[labPaketFormKey]?.value]);
    } else {
      handleValueChange([{ newValue: selectedHarga, key: labPaketFormKey }]);
    }
  };

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
                type="number"
                disabled={!editable}
                value={findHarga ? findHarga.value : "-"}
                onChange={(e) => {
                  handleChange(e, harga.type);
                }}
                onBlur={(e) => registerValue(e, harga.type)}
                className={
                  editable
                    ? "w-full h-full bg-white px-2 shadow-inner border-l border-greyBorder text-greyDrk"
                    : "w-full h-full bg-hoverBG px-2 shadow-inner border-l border-greyBorder text-greyMed2"
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabPaketHarga;
