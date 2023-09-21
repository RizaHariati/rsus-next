import dayjs from "dayjs";
import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { useGlobalContext } from "../../context/AppProvider";

registerLocale("id", id);
type Props = {
  handleDateChange: (date: Date) => void;
  clearDate: () => void;
  searchCategory: "dokter" | "spesialisasi";
};

const SelectDate = ({ searchCategory, handleDateChange, clearDate }: Props) => {
  const {
    state: { selected_date },
  } = useGlobalContext();
  return (
    <div className="w-full flex gap-2 flex-col h-fit md:h-16 ">
      <p className="md:btn-3-bold btn-4 w-full leading-4 md:leading-5">
        Pilih tanggal berobat
        <span className="normal-case tracking-normal">
          (Maksimal 7 hari ke depan)
        </span>
      </p>
      <div className="flex flex-col md:flex-row justify-between w-full gap-2 ">
        <ReactDatePicker
          disabled={searchCategory === "dokter" ? true : false}
          placeholderText={
            searchCategory === "dokter"
              ? "Pilih spesialisasi"
              : "Biarkan kosong atau pilih tanggal yang diinginkan"
          }
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          calendarClassName="text-md font-light outline-none h-fit w-full"
          className="react-datepicker w-full md:w-[350px] h-10 p-2 text-greyMed1 font-nunito text-base"
          locale="id"
          dateFormat={`eeee, dd MMMM yyyy`}
          selected={selected_date}
          // onSelect={(date: Date) => handleSelectedDate(date)} //when day is clicked
          onChange={(date: Date) => handleDateChange(date)} //only when value has changed
          minDate={new Date(dayjs().toString())}
          maxDate={new Date(dayjs().add(6, "d").toString())}
        />

        <button
          disabled={searchCategory === "dokter" ? true : false}
          onClick={() => clearDate()}
          className={
            searchCategory === "dokter"
              ? "h-10 button-grey text-sm "
              : "h-10 button-greenUrip text-sm "
          }
        >
          Hapus tanggal
        </button>
      </div>
    </div>
  );
};

export default SelectDate;
