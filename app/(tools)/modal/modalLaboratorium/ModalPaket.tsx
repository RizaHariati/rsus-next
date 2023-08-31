import React, { useEffect, useState } from "react";
import dataFacility from "@/app/(tools)/data/data_facility.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { LaboratoriumType, PaketLabType, PemeriksaanType } from "../../types";
import { getLabGender } from "../../utils/getLabGender";
import { getFasGender } from "../../utils/getFasGender";
import { samplePatient } from "../../data/samplePatient";
import { findInCart } from "../../utils/findInCart";
import { toast } from "react-toastify";
type Props = {};

const ModalPaket = (props: Props) => {
  const {
    state: { modalValue, labCart },
    closeModal,
    openModal,
    openAlert,
    toggleCart,
  } = useGlobalContext();

  const paketLab: PaketLabType = modalValue;
  const [pemeriksaan, setPemeriksaan] = useState<PemeriksaanType[]>(
    paketLab.pemeriksaan
  );
  const [laboratorium, setLaboratorium] = useState<LaboratoriumType[]>(
    paketLab.laboratorium
  );
  const [selectGender, setSelectGender] = useState<"pria" | "wanita" | null>(
    null
  );
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (!selectGender) return;
    setShowAlert(false);
    if (selectGender === "pria") {
      const newLab = getLabGender(paketLab, "pria");
      setLaboratorium(newLab);
      const newPemeriksaan = getFasGender(paketLab, "pria");
      setPemeriksaan(newPemeriksaan);
    } else if (selectGender === "wanita") {
      const newLab = getLabGender(paketLab, "wanita");
      setLaboratorium(newLab);
      const newPemeriksaan = getFasGender(paketLab, "wanita");
      setPemeriksaan(newPemeriksaan);
    }
    // eslint-disable-next-line
  }, [selectGender]);

  const openingLabCart = () => {
    if (paketLab.price[0].type !== "all" && !selectGender) {
      setShowAlert(true);
      return;
    }
    //  check login
    else {
      if (samplePatient.login) {
        const findLabItem = labCart.find((item) => item.id === paketLab.id);
        findLabItem
          ? toast(`${paketLab.title} berhasil dihapus`)
          : toast(`${paketLab.title} berhasil ditambahkan`);
        toggleCart(
          paketLab,
          paketLab.price[0].type === "all" ? "all" : selectGender!
        );
        openModal("keranjang", {});
      } else {
        openAlert("lablogin", { paketLab, selectGender });
      }
    }
  };
  return (
    <div className="modal-lg p-5 px-10">
      <h3 className=" col-span-2 font-normal w-full border-b border-greyBorder">
        {paketLab.title}
      </h3>
      <div className="flex items-end justify-end mb-3 w-full text-right gap-2">
        <p>Harga</p>
        {paketLab.price.map((item, index) => {
          const { type, value } = item;
          return (
            <div key={index}>
              {type === "all" && value > 0 && (
                <p>Rp. {value.toLocaleString()}</p>
              )}
              {type === "pria" && <p>Pria : Rp. {value.toLocaleString()}</p>}
              {type === "wanita" && (
                <p>Wanita : Rp. {value.toLocaleString()}</p>
              )}
            </div>
          );
        })}
      </div>
      <button className="absolute top-2 right-4" onClick={() => closeModal()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="w-full  grid grid-cols-2 gap-3 max-h-80 custom-scrollbar">
        <div className="w-full h-full border-r border-greyBorder ">
          <p className="btn-2-bold">Pemeriksaan</p>
          <ul>
            {pemeriksaan.map((item: PemeriksaanType) => {
              const findFacility = dataFacility.find(
                (facility) => facility.id === item.id
              );
              const description = item.description
                ? item.description
                : findFacility?.description;
              return (
                <li
                  key={item.id}
                  className=" list-disc mx-5"
                  onClick={() => {
                    if (findFacility) {
                      openModal("facility", findFacility);
                    }
                  }}
                >
                  <p className="body-3">{item.title}</p>

                  {description && description.length > 150 ? (
                    <p className="body-3 cursor-pointer hover:text-greyMed2 transition-all">
                      {description.slice(0, 150)}
                      <span className=" text-greenUrip"> ...selengkapnya</span>
                    </p>
                  ) : (
                    <p className="body-3">{description} </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full h-full ">
          <p className="btn-2-bold">Laboratorium</p>
          <ul>
            {laboratorium.map((item: LaboratoriumType) => {
              return (
                <li key={item.id} className="list-disc ml-4">
                  <p className="body-3">{item.title}</p>
                  {/* <p className="body-3">{description}</p> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {paketLab.price[0].type !== "all" && (
        <div className=" w-full flex items-end flex-col justify-end">
          <p
            className={
              showAlert
                ? "h-10 overflow-hidden transition-all text-redBase"
                : "h-0 overflow-hidden  transition-all"
            }
          >
            ----------Anda belum memilih gender----------
          </p>
          <SelectGender
            selectGender={selectGender}
            setSelectGender={setSelectGender}
          />
        </div>
      )}
      <div className=" w-full flex items-center justify-end gap-3 pt-2">
        <button onClick={() => openingLabCart()} className="button-greenUrip">
          {findInCart(labCart, paketLab.id) ? "Hapus" : "Pilih"}
        </button>
        <button
          className="button-greenUrip"
          onClick={() => {
            closeModal();
          }}
        >
          Batal
        </button>
      </div>
    </div>
  );
};
export default ModalPaket;

type GenderProps = {
  selectGender: "pria" | "wanita" | null;
  setSelectGender: React.Dispatch<
    React.SetStateAction<"wanita" | "pria" | null>
  >;
};

const SelectGender = ({ selectGender, setSelectGender }: GenderProps) => {
  return (
    <div className="flex items-center justify-end mt-2 gap-2">
      <p className="btn-3">Pilih salah satu</p>
      <button
        onClick={() => setSelectGender("pria")}
        className={
          selectGender === "pria"
            ? "btn-3-bold text-greenUrip"
            : "btn-3 text-grey"
        }
      >
        <FontAwesomeIcon icon={faCircle} /> Pria
      </button>
      <button
        onClick={() => setSelectGender("wanita")}
        className={
          selectGender === "wanita"
            ? "btn-3-bold text-greenUrip"
            : "btn-3 text-grey"
        }
      >
        <FontAwesomeIcon icon={faCircle} /> Wanita
      </button>
    </div>
  );
};
