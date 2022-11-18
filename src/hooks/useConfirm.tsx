import { createContext, useContext, useState } from 'react';

import { DefaultModal } from 'components/Modals/DefaultModal';
import { ModalDeleteContent } from 'components/Modals/modalDeleteContent';

interface ConfirmProps{
  text?:string
  title?:string
  hasConfirm?:boolean
  valueRescue?:string

}

interface ConfirmContextData{
  confirm(value:ConfirmProps):void
  confirmation:ConfirmProps
} 

interface Props{
  children?: JSX.Element | JSX.Element[]
}


const ConfirmContext = createContext<ConfirmContextData>({} as ConfirmContextData)

const ConfirmProvider = ({children}:Props) =>{
  const [openConfirm, setOpenConfirm] = useState(false)
  const [confirmation, setHasConfirm] = useState<ConfirmProps>({
    hasConfirm:false
  })

    const confirm = ({hasConfirm,text,title,valueRescue}:ConfirmProps) =>{
      setOpenConfirm(true)
      setHasConfirm({
        hasConfirm,
        text,
        title,
        valueRescue
      })
    }

  return(
    <ConfirmContext.Provider value ={{confirm,confirmation}}>
      {children}
      <DefaultModal
        width="90%"
        margin="auto 0"
        isOpen={openConfirm}
        setIsOpen={() =>{setOpenConfirm(true)}}
        content={
          <ModalDeleteContent 
          hasInputValue
          text = {confirmation.text}
          title = {confirmation.title}
          setIsOpen={setOpenConfirm} 
          handleConfirm={setHasConfirm} />
        }
      />
    </ConfirmContext.Provider>
  )
}

function useConfirm() {
  const context = useContext(ConfirmContext)

  if(!context){
    throw new Error('useConfirm must be used ConfirmProvider')
  }

  return context
}

export { ConfirmProvider, useConfirm };

