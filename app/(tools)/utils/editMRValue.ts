export const editMRValue = (
  medical_record_number: string,
  keypressed: string
) => {
  let newValue = "";
  const mrl = medical_record_number.length;
  const mrn = medical_record_number;
  const A = mrn.slice(0, 2);
  const B = mrn.slice(2, 6);
  const C = mrn.slice(6, 10);
  const D = mrn.slice(10, 12);
  if (mrl < 2) {
    newValue = mrn;
  } else if (mrl === 2) {
    if (keypressed === "maju") {
      newValue = mrn + "-";
    } else {
      newValue = mrn;
    }
  } else if (mrl > 2 && mrl < 7) {
    newValue = A + "-" + B;
  } else if (mrl === 6) {
    if (keypressed === "maju") {
      newValue = A + "-" + B + "-";
    } else {
      newValue = A + "-" + B;
    }
  } else if (mrl > 6 && mrl < 10) {
    newValue = A + "-" + B + "-" + C;
  } else if (mrl === 10) {
    if (keypressed === "maju") {
      newValue = A + "-" + B + "-" + C + "-";
    } else {
      newValue = A + "-" + B + "-" + C;
    }
  } else {
    newValue = A + "-" + B + "-" + C + "-" + D;
  }
  return newValue.toUpperCase();
};
