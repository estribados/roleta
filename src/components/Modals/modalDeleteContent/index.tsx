import { Dialog } from '@headlessui/react';
import React, { ReactNode, useRef } from 'react';

import { useConfirm } from 'hooks/useConfirm';

import { ButtonConfirm, CancelButton } from './styles';

interface ConfirmProps{
  text?:string
  title?:string
  hasConfirm?:boolean
  valueRescue?:string

}

interface IModalDeleteContentProps {
  icon?: ReactNode;
  text?: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  hasInputValue:boolean
  handleConfirm: (confirm: ConfirmProps) => void;
}

const ModalDeleteContent: React.FC<IModalDeleteContentProps> = ({
  icon,
  setIsOpen,
  title,
  text,
  handleConfirm,
  hasInputValue
}) => {
  const cancelButtonRef = useRef(null);
  const {confirmation,confirm} = useConfirm()

  return (
    <>
      <div>
        <div className="mx-auto flex items-center justify-center rounded-full">
          {icon}
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="leading-6 text-2xl font-bold text-gold100"
          >
            {title}
          </Dialog.Title>
          <div className="mt-4 md:px-16 px-5 text-black">{text}</div>
            {hasInputValue && 
              <div className='mt-5'>
                <label className='text-gray-500 font-bold  mt-5' htmlFor="valorDisponivel">Valor:</label>
                <input onChange={(e) =>{ 
                    confirm({
                      ...confirmation,
                      valueRescue:e.target.value
                    })
                  }} id="valorDisponivel" type="text" placeholder={`Valor disponivel R$ 1200,00`} className="placeholder:text-gray-400 text-gray-500 text input input-bordered input-warning w-full max-w-xs rounded-md ml-0 md:ml-5" />
              </div>
            }
          </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense ">
        <ButtonConfirm  onClick={() =>{
          handleConfirm({...confirmation,hasConfirm:true})
          setIsOpen(false)
          setTimeout(() =>{
            handleConfirm({hasConfirm:false})
          },1000)

        }}>
          Confirmar
        </ButtonConfirm>
        <CancelButton
          type="button"
          onClick={() => {
            handleConfirm({...confirmation,hasConfirm:false})
            setIsOpen(false)
          }
          }
          ref={cancelButtonRef}
        >
          Voltar
        </CancelButton>
      </div>
    </>
  );
};

export { ModalDeleteContent };

