import { createContext } from "react";
import { AppState } from "./interfaces";

export type AppContextProps = {
  state: AppState;
  dispatch: ({ type }: { type: string; payload?: any }) => void;
  toggleMenu: (id: string | null) => void;
  openModal: (title: string, value: any) => void;
  closeModal: () => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
