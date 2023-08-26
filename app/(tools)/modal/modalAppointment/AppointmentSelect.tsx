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
import ResultSpesialisasi from "./ResultSpesialisasi";

type Props = {};
const AppointmentSelect = () => {
  const {
    state: { modalValue },
    filteringDoctor,
  } = useGlobalContext();
  const consultationInfo: ConsultationMenuTypes = modalValue;
  const [
    { searchCategory, searchKeyword, specializationList, pickDate },
    dispatch,
  ]: [AppointmentState, Dispatch<any>] = useReducer(
    appointmentReducer,
    appointmentState
  );

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

  const handleDateChange = (date: Date) => {
    dispatch({ type: "SET_DATE", payload: { date } });
  };
  const clearDate = () => {
    dispatch({ type: "CLEAR_DATE" });
  };
  return (
    <mark className="w-full  grid grid-cols-2 gap-5 h-full body-3 max-h-96">
      <div className=" w-full standard-border p-3  flex flex-col gap-5">
        <SelectDate
          pickDate={pickDate}
          handleDateChange={handleDateChange}
          clearDate={clearDate}
        />
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
          pickDate={pickDate}
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

const ResultDokter = ({ searchKeyword, consultationInfo }: ResultProps) => {
  const {
    state: { filtered_doctor },
  } = useGlobalContext();

  return (
    <div>
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
      {consultationInfo.modal_img && (
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
    </div>
  );
};
