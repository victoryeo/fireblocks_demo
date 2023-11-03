import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { useState } from "react";

export type IModal = {
  name?: string;
  component?: React.ReactNode;
  onConfirm?: () => void;
} | null;
export interface AppContextProps {
  children?: React.ReactNode;
}

export interface IModalContext {
  setModal: Dispatch<SetStateAction<IModal | undefined>>;
  modal?: IModal;

}

export const ModalContext = createContext<IModalContext| undefined>(undefined);

export function ModalProvider({ children }: AppContextProps) {
const [modal, setModal] = useState<IModal>()

return (
  <ModalContext.Provider
    value={{
      modal,
      setModal,
    }}
  >
    {children}
  </ModalContext.Provider>
);
}

export function useModalContext() {
const context = useContext(ModalContext);
if (!context) {
  throw new Error('You must use AppProvider in order to consume this context');
}
return context;
}

