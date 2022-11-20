import { useRouter } from 'next/router'
import React, { ButtonHTMLAttributes, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'

import { DefaultModal } from 'components/Modals/DefaultModal'
import { useToast } from 'hooks/useToast'
import api from 'services/api'

import { Container, ContainerAnimated } from './styles'

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
  animation?:boolean
  textSize?:string
  children?:JSX.Element | string | JSX.Element[]
}

const ButtonMP:React.FC<ButtonProps> = ({animation,textSize,children, ...rest}) =>{
  const {push} = useRouter()
  const {notify} = useToast()

  const [openModal,setOpenModal] = useState(false)
  const [credits,setCredits] = useState('')
  const buyCredits = useCallback(async () =>{
   const response = await api.post('mercadoPago/createPayment',{
      creditSolicitation:Number(credits)
    })
    const {init_point} = response.data

    notify({
      message:"Você será direcionado para a tela de pagamentos",
      types:'info'
    })

    setTimeout(() =>{
      push(init_point)
    },2000)


  },[credits, notify, push])

  return(
    <div className=''>
    <ContainerAnimated onClick={() =>{setOpenModal(true)}} animation ={animation}>
      <Container   className='flex items-center justify-center w-full h-full   text-white' {...rest} >
        {children}
      </Container>
    </ContainerAnimated>
      <DefaultModal
        width="100%"
        margin="auto 0"
        isOpen={openModal}
        setIsOpen={() =>{setOpenModal(true)}}
        content={
          <div className=''>
            <header className='flex w-full justify-between items-center text-black mb-5'>
              Compra de creditos
              <FiX cursor={'pointer'} onClick={() =>{setOpenModal(false)}}/>
            </header>

            <div className='mx-auto w-full max-w-sm flex items-center justify-center flex-col'>
              <h1 className='text-gold100 font-bold'>Digite o valor de creitos que ira comprar</h1>
              <input onChange={(e) =>{setCredits(e.target.value)}} type="number" placeholder="Valor do credito" className="input text-black input-bordered w-full input-warning   bg-slate-100 my-3" />
              <button onClick={buyCredits} className="w-full btn btn-outline btn-warning">ESCOLHER FORMA DE PAGAMENTO</button>
            </div>
          </div>
        }
      />
    </div>

  )
}
export { ButtonMP }

