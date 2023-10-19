import React from "react";
import "moment/locale/id";
import moment from "moment";

type Props = {};

const InputRegisterDate = (props: Props) => {
  return (
    <article className="w-full md:w-1/2 flex flex-col h-16 bg-white">
      <p className="btn-3-bold">Register Date</p>
      <div className="dark-input">
        <p className="btn-3 ">
          {moment().locale("id").format("dddd, DD MMMM YYYY")}
        </p>
      </div>
    </article>
  );
};

export default InputRegisterDate;
