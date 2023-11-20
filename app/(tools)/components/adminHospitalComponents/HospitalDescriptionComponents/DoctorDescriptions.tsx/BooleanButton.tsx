import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
type Props = {
  booleanValue: number;
};

const BooleanButton = ({ booleanValue }: Props) => {
  return (
    <div className="w-full h-10 flex items-center">
      <button className="w-12 h-6 bg-white border border-greyBorder flex items-center rounded-full p-1 transition-all">
        <FontAwesomeIcon
          icon={faCircle}
          className={
            booleanValue === 1
              ? "text-6 ml-auto text-greenUrip  transition-all"
              : "text-6 mr-auto text-greyMed1 transition-all"
          }
        />
      </button>
    </div>
  );
};

export default BooleanButton;
