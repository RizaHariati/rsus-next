import { createContext } from "react";
import { AppState } from "./interfaces";

export type AppContextProps = {
  state: AppState;
  dispatch: ({ type }: { type: string; payload?: any }) => void;
  toggleMenuNavbar: (id: string | null) => void;
  openModal: (title: string, value: any) => void;
  closeModal: () => void;
  filteringDoctor: (
    keyword: string,
    category: "spesialisasi" | "dokter"
  ) => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
