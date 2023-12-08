import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { faPenClip, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DeleteAlertBtn } from "./EditDeleteButtons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {};

const PatientEditDelete = ({}: Props) => {
  const {
    showDetail,
    deletePatient,
    state: { editable, editAlert },
    patientState: { patient, selectedScheduleAppointment },
    settingEditable,
  } = useGlobalContext();
  const customId = "custom-id-yes";
  const router = useRouter();
  const handleDeletePatient = () => {
    if (
      !patient ||
      !patient.medical_record_number ||
      !selectedScheduleAppointment
    )
      return;

    const key = showDetail.key;
    switch (key) {
      case "patient_profile":
        // if (patient.medical_record_number === "US4234123398 ") {
        //   return toast.error("Admin default tidak bisa dihapus");
        // } else {
        const promiseDelete = new Promise((resolve) => {
          setTimeout(() => {
            resolve(deletePatient(key, patient.medical_record_number));
            return router.push("/");
          }, 1000);
        }).then((res) => {
          return res;
        });

        toast.promise(promiseDelete, {
          pending: "Mulai dihapus",
          success: "Data pasien berhasil dihapus",
          error: "Promise rejected 🤯",
        });
        // }

        break;
      case "scheduled_appointments":
        deletePatient(key, selectedScheduleAppointment?.schedule_id);
        toast.success("Jadwal berhasil dihapus");

        break;

      default:
        break;
    }

    settingEditable(false);
  };
  return (
    <div className="content-menu order-0 w-fit">
      <button
        onClick={() => settingEditable(!editable)}
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
          toast.warning(
            showDetail.key === "patient_profile"
              ? "Seluruh data Pasien ini akan dihapus, anda yakin?"
              : "Data ini akan dihapus, anda yakin?",
            {
              autoClose: false,
              closeButton: (
                <DeleteAlertBtn handleDelete={handleDeletePatient} />
              ),
              position: toast.POSITION.TOP_CENTER,
              className: "flex-col",
              toastId: customId,
            }
          );
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

export default PatientEditDelete;
