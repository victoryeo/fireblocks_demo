import { CreateToken, Mint } from '@da-tokenization/components';
import { useModalContext } from '@da-tokenization/providers';
import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { useState } from "react";

export interface AppContextProps {
  Data : Array<any>
  v:any
}

export interface IModalContext {
  setIsopen: Dispatch<SetStateAction<any | undefined>>;
  isOpen?: any;

}
export const DropdownContext = createContext<IModalContext| undefined>(undefined);

export function DropdownProviver({ Data,v }: AppContextProps) {
  const [isOpen, setIsopen] = useState<boolean>()
  const { setModal } = useModalContext();
  console.log(v,'this is the data we want')

  return (
    <DropdownContext.Provider value={{
      isOpen,
      setIsopen,
    }}>
    </DropdownContext.Provider>
  )
}
