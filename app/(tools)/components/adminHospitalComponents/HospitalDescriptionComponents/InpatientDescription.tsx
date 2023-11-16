import { useGlobalContext } from "@/app/(tools)/context/AppProvider";
import { inpatientForm } from "@/app/(tools)/utils/forms/InpatientFormInput";

type Props = {};

const InpatientDescription = (props: Props) => {
  const {
    state: { columnAssignment, editable },
    hospitalState: { selectedInpatient },
  } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const formInputInpatient = Object.entries(inpatientForm);

  return (
    <form
      className="column-description-container "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="column-description-content">
        {formInputInpatient.map(([inpatientKey, inpatientValue], index) => {
          //@ts-ignore
          const inpatientDetail = selectedInpatient?.[inpatientKey] || "";
          return (
            <div key={index} className="w-full">
              <small className="">{inpatientValue.title}</small>
              <input
                value={inpatientDetail.toString()}
                className={editable ? "admin-input" : "admin-input-disabled"}
              />
            </div>
          );
        })}
      </div>
      <div className="content-menu border-t">
        <button
          type="submit"
          className={
            editable ? "btn-base-focus px-12 " : "btn-base-small w-28 px-12"
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InpatientDescription;
