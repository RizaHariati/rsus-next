import dayjs from "dayjs";
import React from "react";
import id from "dayjs/locale/id";

type Props = {};

const InputRegisterDate = (props: Props) => {
  return (
    <article className="w-1/2 flex flex-col h-16">
      <p className="btn-3-bold">Register Date</p>
      <div className="dark-input">
        <p className="btn-3 ">
          {dayjs().locale(id).format("dddd, DD MMMM YYYY")}
        </p>
      </div>
    </article>
  );
};

export default InputRegisterDate;
