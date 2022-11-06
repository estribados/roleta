import Win from 'components/Win';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';


export interface ToastMessage{
  type:'success' | 'error' | 'info';
  description?:string;
  title:string;
  id:string;

}

interface WinContextData{
  activeWin(value:boolean):void;
  isWin:boolean
}

interface Props{
  children?: JSX.Element | JSX.Element[]
}

const WinContext = createContext<WinContextData>({} as WinContextData)

const WinProvider = ({children}:Props) =>{
  const [isWin, setWin] = useState(false)

  const activeWin = useCallback((isWin:boolean) => {
    setWin(isWin)
  }, [])

  useEffect(() => {

      const timer = setTimeout(() => {
      }, 10000);

      const timer2 = setTimeout(() => {
      }, 12000);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
  }, []);

  return(
    <WinContext.Provider value ={{isWin,activeWin}}>
      {children}
      <Win isWin={isWin} />
    </WinContext.Provider>
  )
}

function useWin() {
  const context = useContext(WinContext)

  if(!context){
    throw new Error('useWin must be used WinProvider')
  }

  return context
}

export { WinProvider, useWin };

