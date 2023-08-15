"use client";

import { useEffect, useContext, useReducer } from "react";
import { AppContext } from "./AppContext";
import { initialState } from "./initialState";
import { appReducer } from "../reducers/appReducer";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleMenu = (id: string | null) => {
    dispatch({ type: "TOGGLE_MENU", payload: id });
  };
  const value = {
    state,
    dispatch,
    toggleMenu,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
