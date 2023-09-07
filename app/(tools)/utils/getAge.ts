import dayjs from "dayjs";
import id from "dayjs/locale/id";

export const getAge = (birthdate: Date) => {
  const today = dayjs();
  const birthDate = dayjs(birthdate);

  const diffYear = birthDate.diff(today, "year");
  const birthMonth = birthDate.subtract(diffYear, "y");
  const diffMonth = today.diff(birthMonth, "months");
  return { ageyear: Math.abs(diffYear), agemonth: Math.abs(diffMonth) };
};
