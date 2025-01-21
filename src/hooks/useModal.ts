import { useState } from "react";

export type ModalObjectType = {
  UID?: string;
  children?: React.ReactNode;
};

export interface UseModal {
  list: ModalObjectType[];
  open: (obj: ModalObjectType) => void;
  close: (UID: string) => void;
}

export const useModal: () => UseModal = () => {
  const [list, setList] = useState<ModalObjectType[]>([])

  const open = (obj: ModalObjectType) => {
    setList((prev) => [...prev, { ...obj, open: true, UID: Date.now().toString() }])
  }

  const close = (UID: string) => {
    setList((prev) => prev.filter((modal) => modal.UID !== UID))
  }

  return { list, open, close }
}