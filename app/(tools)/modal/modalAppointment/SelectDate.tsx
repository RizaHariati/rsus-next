import dayjs from "dayjs";
import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";

registerLocale("id", id);
type Props = {
  pickDate: Date | undefined;
  handleDateChange: (date: Date) => void;
  clearDate: () => void;
};

const SelectDate = ({ pickDate, handleDateChange, clearDate }: Props) => {
  return (
    <div className="w-full flex gap-2 flex-col h-16 ">
      <p className="btn-3-bold w-full ">
        Pilih tanggal berobat
        <span className="normal-case tracking-normal">
          (Maksimal 7 hari ke depan)
        </span>
      </p>
      <div className="flex justify-between w-full gap-0 ">
        <ReactDatePicker
          placeholderText="Biarkan kosong atau pilih tanggal yang diinginkan"
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          calendarClassName="text-md font-light outline-none h-fit w-full"
          className="react-datepicker w-[350px] col-span-5 h-10 p-2 text-greyMed1 font-nunito text-base"
          locale="id"
          dateFormat={`eeee, dd MMMM yyyy`}
          selected={pickDate}
          // onSelect={(date: Date) => handleSelectedDate(date)} //when day is clicked
          onChange={(date: Date) => handleDateChange(date)} //only when value has changed
          minDate={new Date(dayjs().toString())}
          maxDate={new Date(dayjs().add(6, "d").toString())}
        />

        <button
          onClick={() => clearDate()}
          className="h-10 button-greenUrip text-sm "
        >
          Hapus tanggal
        </button>
      </div>
    </div>
  );
};

export default SelectDate;
