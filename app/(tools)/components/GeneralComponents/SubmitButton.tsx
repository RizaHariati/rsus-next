import React from "react";
import { useGlobalContext } from "../../context/AppProvider";

type Props = {};

const SubmitButton = (props: Props) => {
  const {
    state: { editable },
  } = useGlobalContext();
  return (
    <div className="content-menu border-t ">
      <button
        type="submit"
        className={
          editable
            ? "btn-base-focus px-12 mx-0"
            : "btn-base-small w-28 px-12 mx-0"
        }
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;
