import dayjs from "dayjs";
import id from "dayjs/locale/id";

export const getAge = (birthdate: string) => {
  const dd = birthdate.slice(0, 2);
  const mm = birthdate.slice(3, 5);
  const yy = birthdate.slice(6, 10);

  const date1 = dayjs();
  const date2 = dayjs(`${mm}-${dd}-${yy}`).locale(id);
  const ageyear = date1.diff(date2, "year").toString();
  const newyy = parseInt(yy) + parseInt(ageyear);
  const date3 = dayjs(`${mm}-${dd}-${newyy}`).locale(id);
  const agemonth = date1.diff(date3, "month").toString();

  return { ageyear, agemonth };
};
