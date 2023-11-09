import { maxWidth, minWidth } from "../context/initialState";
import { CCO, COC, COO, OCC, OCO, OOC, OOO } from "./columnPattern";

export const closeSideBar = (currentWindow: number) => {
  return currentWindow < minWidth
    ? CCO
    : currentWindow >= minWidth && currentWindow <= maxWidth
    ? COO
    : OOO;
};

export const openSidebar = (currentWindow: number) => {
  return currentWindow < minWidth
    ? OCC
    : currentWindow >= minWidth && currentWindow <= maxWidth
    ? OCO
    : OOO;
};

export const closeMidbar = (currentWindow: number) => {
  return currentWindow < minWidth
    ? OCC
    : currentWindow >= minWidth && currentWindow <= maxWidth
    ? OCO
    : OOO;
};

export const openMidbar = (currentWindow: number) => {
  return currentWindow < minWidth
    ? COC
    : currentWindow >= minWidth && currentWindow <= maxWidth
    ? COO
    : OOO;
};

export const closeDescription = (currentWindow: number) => {
  return currentWindow < minWidth
    ? OCC
    : currentWindow >= minWidth && currentWindow <= maxWidth
    ? OOC
    : OOO;
};

export const openDescription = (currentWindow: number) => {
  return currentWindow < minWidth
    ? CCO
    : currentWindow >= minWidth && currentWindow <= maxWidth
    ? OCO
    : OOO;
};
