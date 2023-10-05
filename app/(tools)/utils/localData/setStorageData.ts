import { UserType } from "../../patientTypes";

export const setUser = (user: UserType) => {
  localStorage.setItem("user", JSON.stringify(user));
};
