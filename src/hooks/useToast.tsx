import React,{createContext, useState,useContext, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface typesNotify{
  id:string
  types:'error' | 'success' | 'info' | 'warning'
  message:string
}

interface ToastContextState{
  notify({message,types}:Omit<typesNotify,'id'>):number | string

}

interface Props{
  children:JSX.Element | JSX.Element
}

//iniciando um contexto vazio precisa colocar o as e o nome da interface
const ToastContext = createContext<ToastContextState>({} as ToastContextState)

const ToastProvider = ({children}:Props) => {

  const notify = ({types,message}:Omit<typesNotify,'id'>) =>{
    const typesToast = {
      error:() => toast.error(message),
      success:() => toast.success(message),
      warning:() => toast.warning(message),
      info:() => toast.info(message)
    }

    return typesToast[types]()
  }

  return (
    <ToastContext.Provider value ={{notify}}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextState{
  const context = useContext(ToastContext)

  if(!context) {
    throw new Error('insira o toastProvider ao redor do seu elemento')
  }
  return context
}

export {ToastProvider, useToast}