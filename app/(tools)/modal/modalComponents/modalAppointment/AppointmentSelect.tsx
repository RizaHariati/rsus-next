import React, { useReducer, useState, Dispatch } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import Image from "next/image";
import { ConsultationMenuTypes, PoliklinikType } from "@/app/(tools)/types";
import SelectDate from "./SelectDate";
import { appointmentState, AppointmentState } from "./appointmentState";
import { appointmentReducer } from "@/app/(tools)/reducers/appointmentReducer";

type Props = {};
const AppointmentSelect = () => {
  const {
    state: { modalValue },
    filteringDoctor,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;
  const [{ searchCategory, searchKeyword, specializationList }, dispatch]: [
    AppointmentState,
    Dispatch<any>
  ] = useReducer(appointmentReducer, appointmentState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const keywordInput = e.currentTarget.value;
    if (searchCategory === "spesialisasi") {
      dispatch({ type: "GET_SPESIALISASI_LIST", payload: { keywordInput } });
    } else {
      dispatch({ type: "SET_KEYWORD", payload: { keywordInput } });
      filteringDoctor(keywordInput, "dokter");
    }
  };

  return (
    <mark className="w-full  grid grid-cols-2 gap-5 h-full body-3 max-h-96">
      <div className=" w-full standard-border p-3  flex flex-col gap-5">
        <SelectDate />
        <div className="w-full flex gap-2 flex-col h-16">
          <div className="flex gap-2">
            <p className="btn-3-bold">
              {searchCategory === "spesialisasi"
                ? "Spesialisasi/klinik"
                : "Nama dokter"}
            </p>
            <div className=" flex body-3 ml-auto gap-5">
              <button
                className="flex-center-between gap-2"
                onClick={() =>
                  dispatch({
                    type: "SET_CATEGORY",
                    payload: { category: "spesialisasi" },
                  })
                }
              >
                <FontAwesomeIcon
                  icon={
                    searchCategory === "spesialisasi" ? faCircleDot : faCircle
                  }
                  className={
                    searchCategory === "spesialisasi"
                      ? " text-greenUrip"
                      : "text-greyMed1"
                  }
                />
                <p
                  className={
                    searchCategory === "spesialisasi"
                      ? "font-semibold"
                      : "font-light"
                  }
                >
                  Spesialisasi
                </p>
              </button>
              <button
                className="flex-center-between gap-2"
                onClick={() =>
                  dispatch({
                    type: "SET_CATEGORY",
                    payload: { category: "dokter" },
                  })
                }
              >
                <FontAwesomeIcon
                  icon={
                    searchCategory === "spesialisasi" ? faCircle : faCircleDot
                  }
                  className={
                    searchCategory !== "spesialisasi"
                      ? " text-greenUrip"
                      : "text-greyMed1"
                  }
                />
                <p
                  className={
                    searchCategory !== "spesialisasi"
                      ? "font-semibold"
                      : "font-light"
                  }
                >
                  Dokter
                </p>
              </button>
            </div>
          </div>
          <div className="standard-border w-full">
            <input
              className="active-input"
              value={searchKeyword}
              placeholder={`Ketik ${
                searchCategory === "spesialisasi" ? "spesialisasi" : "dokter"
              } yang dituju`}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>

      {searchCategory === "spesialisasi" && (
        <ResultSpesialisasi
          searchKeyword={searchKeyword}
          consultationInfo={consultationInfo}
          specializationList={specializationList}
          searchCategory={searchCategory}
        />
      )}
      {searchCategory === "dokter" && (
        <ResultDokter
          searchKeyword={searchKeyword}
          consultationInfo={consultationInfo}
          specializationList={specializationList}
          searchCategory={searchCategory}
        />
      )}
    </mark>
  );
};
export default AppointmentSelect;

type ResultProps = {
  searchKeyword: string;
  consultationInfo: ConsultationMenuTypes;
  specializationList: PoliklinikType[];
  searchCategory: "spesialisasi" | "dokter";
};

const ResultSpesialisasi = ({
  searchKeyword,
  consultationInfo,
  specializationList,
  searchCategory,
}: ResultProps) => {
  const { filteringDoctor } = useGlobalContext();

  return (
    <>
      {!searchKeyword && consultationInfo.modal_img && (
        <div className="w-full h-40 my-auto">
          <Image
            rel="preload"
            placeholder="empty"
            src={`/images/pages/${consultationInfo.modal_img}.jpg`}
            alt={consultationInfo.modal_img}
            width={400}
            height={400}
            className="w-auto h-full m-auto"
            loading="lazy"
          />
        </div>
      )}
      {searchKeyword && specializationList.length > 0 && (
        <div className="w-full h-40 my-auto custom-scrollbar flex flex-col gap-2 px-2">
          <h4>Pilih satu spesialis/klinik</h4>
          {specializationList.map((item) => {
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  filteringDoctor(item.id, searchCategory);
                }}
                className="standard-border p-2 w-full text-left overflow-visible hover:bg-greyLit transition-all"
              >
                <p>{item.title}</p>
              </button>
            );
          })}
        </div>
      )}
      {searchKeyword && specializationList.length < 1 && (
        <div className="w-full h-40 my-auto ">
          <p className="btn-3-bold text-center">
            Tidak ditemukan Spesialisasi dengan kata kunci seperti itu
          </p>

          {consultationInfo.modal_img && (
            <div className="w-full h-full my-auto">
              <Image
                rel="preload"
                placeholder="empty"
                src={`/images/pages/${consultationInfo.modal_img}.jpg`}
                alt={consultationInfo.modal_img}
                width={400}
                height={400}
                className="w-auto h-full m-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const ResultDokter = ({ searchKeyword, consultationInfo }: ResultProps) => {
  const {
    state: { filtered_doctor },
  } = useGlobalContext();

  return (
    <>
      {!searchKeyword && consultationInfo.modal_img && (
        <div className="w-full h-40 my-auto">
          <Image
            rel="preload"
            placeholder="empty"
            src={`/images/pages/${consultationInfo.modal_img}.jpg`}
            alt={consultationInfo.modal_img}
            width={400}
            height={400}
            className="w-auto h-full m-auto"
            loading="lazy"
          />
        </div>
      )}{" "}
      {searchKeyword && !filtered_doctor.value && (
        <div className="w-full h-40 my-auto ">
          <p className="btn-3-bold text-center">
            Tidak ditemukan Spesialisasi dengan kata kunci seperti itu
          </p>

          {consultationInfo.modal_img && (
            <div className="w-full h-full my-auto">
              <Image
                rel="preload"
                placeholder="empty"
                src={`/images/pages/${consultationInfo.modal_img}.jpg`}
                alt={consultationInfo.modal_img}
                width={400}
                height={400}
                className="w-auto h-full m-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
