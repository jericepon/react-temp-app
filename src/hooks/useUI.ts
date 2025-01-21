import { createContext, useContext } from "react";
import { UseModal } from "./useModal";
import { UseToast } from "./useToast";

export type UIContextType<T = any> = {
  [key: string]: T | UseModal | UseToast | undefined;
};

export const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context)
  {
    throw new Error("useUI must be used within a UI.Provider");
  }
  return context;
}

