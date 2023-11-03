import moment from "moment";

export const getAge = (birthdate: any) => {
  const today = moment();
  const birthDate = moment(birthdate);

  const diffYear = birthDate.diff(today, "year");
  const birthMonth = birthDate.subtract(diffYear, "y");
  const diffMonth = today.diff(birthMonth, "months");
  return {
    ageyear: Math.abs(diffYear),
    agemonth: Math.abs(diffMonth),
  };
};
