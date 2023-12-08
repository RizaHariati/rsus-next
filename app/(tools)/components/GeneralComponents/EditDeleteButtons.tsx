import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faPenClip, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { toast } from "react-toastify";

type Props = {};

const EditDeleteButtons = ({}: Props) => {
  const customId = "custom-id-yes";
  const {
    showDetail,
    state: { editable, editAlert },
    hospitalState: {
      selectedDoctor,
      selectedFacility,
      selectedInpatient,
      selectedLabSatuan,
      selectedPaket,
    },
    settingEditable,
    deleteHospital,
  } = useGlobalContext();

  const handleDelete = () => {
    const key = showDetail.key;
    if (
      !selectedDoctor ||
      !selectedFacility ||
      !selectedInpatient ||
      !selectedLabSatuan ||
      !selectedPaket
    )
      return;
    switch (key) {
      case "doctor":
        deleteHospital(key, selectedDoctor.id);
        break;
      case "facility":
        deleteHospital(key, selectedFacility.id);
        break;
      case "lab_satuan":
        deleteHospital(key, selectedLabSatuan.id);
        break;
      case "lab_paket":
        deleteHospital(key, selectedPaket.id);
        break;
      case "inpatient":
        deleteHospital(key, selectedInpatient.id);
        break;
      default:
        break;
    }
    settingEditable(false);
    toast.success(`Data ${showDetail.name} berhasil dihapus"`);
  };

  return (
    <div className="content-menu order-0 w-fit">
      <button
        onClick={() => {
          settingEditable(!editable);
        }}
        type="button"
        className={
          editable
            ? "btn-base-focus "
            : editAlert
            ? "btn-base-small border-4 border-redBase border-opacity-30"
            : "btn-base-small"
        }
      >
        <FontAwesomeIcon
          icon={faPenClip}
          className={editable ? "btn-icon-focus " : "btn-icon"}
        />
        <p className={editable ? "btn-text-focus" : "btn-text"}>Edit</p>
      </button>
      <button
        onClick={() => {
          toast.warning("Data ini akan dihapus, anda yakin?", {
            autoClose: false,
            closeButton: <DeleteAlertBtn handleDelete={handleDelete} />,
            position: toast.POSITION.TOP_CENTER,
            className: "flex-col",
            toastId: customId,
          });
        }}
        type="button"
        className="btn-base-small bg=white  group"
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="btn-icon group-focus:text-white "
        />
        <p className="btn-text">Delete</p>
      </button>
    </div>
  );
};

export default EditDeleteButtons;

type DeleteProps = {
  handleDelete: () => void;
};
export const DeleteAlertBtn = ({ handleDelete }: DeleteProps) => {
  return (
    <div className="flex-center-center gap-2  ">
      <button className="w-20 h-8 text-center bg-white hover:bg-greenUripOpacity hover:text-greenUrip transition-all text-sm uppercase border border-greyBorder  hover:border-greenUripOpacity px-1">
        tidak
      </button>
      <button
        className="w-20 h-8 text-center bg-white hover:bg-greenUripOpacity hover:text-greenUrip transition-all text-sm uppercase border border-greyBorder hover:border-greenUripOpacity px-1"
        onClick={() => handleDelete()}
      >
        ya
      </button>
    </div>
  );
};
