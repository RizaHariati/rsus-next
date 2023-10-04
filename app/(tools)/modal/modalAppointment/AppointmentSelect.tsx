import React, { useReducer, useState, Dispatch } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import Image from "next/image";
import { AppointmentMenuTypes, PoliklinikType } from "@/app/(tools)/types";
import SelectDate from "./SelectDate";
import { appointmentState, AppointmentState } from "./appointmentState";
import { appointmentReducer } from "@/app/(tools)/reducers/appointmentReducer";
import ResultSpesialisasi from "./ResultSpesialisasi";

type Props = {};
const AppointmentSelect = () => {
  const {
    state: { modalValue },
    filteringDoctor,
    setDate,
    clearDate,
  } = useGlobalContext();
  const appointmentInfo: AppointmentMenuTypes = modalValue;
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
    <mark className="w-full  grid grid-cols-1 md:grid-cols-2 gap-2 h-full body-3 ">
      <div className=" w-full standard-border p-3 flex flex-col gap-2  ">
        <SelectDate searchCategory={searchCategory} />
        <div className="w-full flex gap-2 flex-col h-fit md:h-16 ">
          <div className="flex flex-col md:flex-row gap-0 md:gap-2">
            <p className="btn-3-bold">
              {searchCategory === "spesialisasi"
                ? "Spesialisasi/klinik"
                : "Nama dokter"}
            </p>
            <div className=" flex body-3 md:ml-auto">
              <button
                className="flex-center-between gap-2 mr-3"
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
                onClick={() => {
                  clearDate();
                  dispatch({
                    type: "SET_CATEGORY",
                    payload: { category: "dokter" },
                  });
                }}
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
          appointmentInfo={appointmentInfo}
          specializationList={specializationList}
          searchCategory={searchCategory}
        />
      )}
      {searchCategory === "dokter" && (
        <ResultDokter
          searchKeyword={searchKeyword}
          appointmentInfo={appointmentInfo}
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
  appointmentInfo: AppointmentMenuTypes;
  specializationList: PoliklinikType[];
  searchCategory: "spesialisasi" | "dokter";
};

const ResultDokter = ({ searchKeyword, appointmentInfo }: ResultProps) => {
  const {
    state: { filtered_doctor },
  } = useGlobalContext();

  return (
    <div className="w-full h-full">
      {searchKeyword && filtered_doctor.value.length < 1 && (
        <p className="btn-3-bold text-center">
          Tidak ditemukan Nama Dokter dengan kata kunci seperti itu
        </p>
      )}
      {searchKeyword && filtered_doctor.value.length > 6 && (
        <p className="btn-3-bold text-center">
          Hasil terlalu banyak, tolong tambah kata kunci
        </p>
      )}
      {appointmentInfo.modal_img && (
        <div className="w-full h-40 my-auto">
          <Image
            rel="preload"
            placeholder="empty"
            src={`/images/pages/${appointmentInfo.modal_img}.jpg`}
            alt={appointmentInfo.modal_img}
            width={400}
            height={400}
            className="w-auto h-full m-auto"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};
