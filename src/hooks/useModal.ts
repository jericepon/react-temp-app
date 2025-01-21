import { createContext, useContext } from "react";

export type ModalObjectType = {
  UID?: string;
  children?: React.ReactNode;
};

export type ModalContextType = {
  openModal: (obj: ModalObjectType) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
  {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}