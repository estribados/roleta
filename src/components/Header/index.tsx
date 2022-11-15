import { Transition } from '@headlessui/react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineBank } from 'react-icons/ai';
import { FiLock, FiMail, FiPhone, FiUser, FiX } from 'react-icons/fi';
import * as Yup from 'yup';

import { ButtonAnimated } from 'components/Buttons/ButtonAnimated';
import Input from 'components/Form/Input';
import { DefaultModal } from 'components/Modals/DefaultModal';
import { NavLink } from 'components/NavLink';
import { useConfirm } from 'hooks/useConfirm';
import { useToast } from 'hooks/useToast';
import getValidationErrors from 'utils/getValidationErros';

import { useAuth } from 'hooks/useAuth';
import ButtonGoldOutLined from '../Buttons/ButtonGold';
import { Container, ContainerLabel, Label } from './styles';

interface ModalProps{
  openModal(value:boolean):void
  hasOpen:boolean
}

interface DataProps{
  name:string
  sobrenome:string
  telephone:string
  password:string
  email:string
  pix:string
  bank:string
}

const Modal:React.FC<ModalProps> = ({hasOpen,openModal}) => {

  const formRef= useRef<FormHandles>(null)

  const handleSubmit= useCallback(async(data:DataProps) =>{
    try{
      formRef.current?.setErrors({});
    
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }
      
    }
  },[])

  return(
    <DefaultModal
        width="100%"
        margin="auto 0"
        isOpen={hasOpen}
        setIsOpen={() =>{openModal(true)}}
        content={
          <div>
            <header className='flex w-full justify-between items-center text-black mb-5'>
              MEUS DADOS
              <FiX cursor={'pointer'} onClick={() =>{openModal(false)}}/>
            </header>

            <Form className='w-full' ref={formRef} onSubmit={handleSubmit}>
              <h4 className=' w-full flex items-center after:flex after:-right-1 after:h-1 after:w-full after:max-w-[220px]  after:bg-gold100 relative after:ml-5 after:rounded-lg  text-gray-500 mb-5'>Dados Pessoais</h4>
              <ContainerLabel >
                <Label htmlFor="nome">
                  <p className='text-gray-300 font-bold'>
                    Nome
                  </p>
                  <Input id='nome' name="nome" icon={FiUser} type="text"  placeholder="Primeiro nome" />
                </Label>

                <Label htmlFor="sobrenome">
                  <p className='text-gray-300 font-bold'>
                    Sobrenome
                  </p>
                  <Input id='sobrenome' name="sobrenome" icon={FiUser} type="text"  placeholder="Segundo nome" />
                </Label>

                <Label htmlFor="telefone">
                  <p className='text-gray-300 font-bold'>
                    Telefone
                  </p>
                  <Input id='telefone' name="telefone" icon={FiPhone} type="text"  placeholder="WhatsApp" />
                </Label>
              </ContainerLabel>

              <h4 className='w-full flex items-center after:flex after:-right-1 after:h-1 after:w-full after:max-w-[200px]  after:bg-gold100 relative after:ml-5 after:rounded-lg  text-gray-500 my-5'>Dados de Acesso</h4>
              
              <ContainerLabel>
                <Label htmlFor="email">
                  <p className='text-gray-300 font-bold'>
                    Email
                  </p>
                  <Input id='email' name="email" icon={FiMail} type="text"  placeholder="Digite um email valido" />
                </Label>

                <Label htmlFor="password">
                  <p className='text-gray-300 font-bold'>
                    Senha
                  </p>
                  <Input id='password' name="password" icon={FiLock} type="text"  placeholder="Minimo 6 digitos" />
                </Label>

                <Label htmlFor="password">
                  <p className='text-gray-300 font-bold'>
                    Confirmação de Senha
                  </p>
                  <Input id='password' name="password" icon={FiLock} type="text"  placeholder="Repita sua senha" />
                </Label>
              </ContainerLabel>

              <h4 className='w-full flex items-center after:flex after:-right-1 after:h-1 after:w-full after:max-w-[170px]  after:bg-gold100 relative after:ml-5 after:rounded-lg  text-gray-500 my-5'>Dados de Bancarios</h4>

              <ContainerLabel>
                <Label htmlFor="pix">
                  <p className='text-gray-300 font-bold'>
                    Pix
                  </p>
                  <Input id='pix' name="pix" icon={AiOutlineBank} type="text"  placeholder="Pix para deposito" />
                </Label>

                <Label htmlFor="bank">
                  <p className='text-gray-300 font-bold'>
                    Banco
                  </p>
                  <Input id='bank' name="bank" icon={AiOutlineBank} type="text"  placeholder="Banco do pix" />
                </Label>
              </ContainerLabel>
              <div className='mt-5'>
                <ButtonAnimated   animation={false} type='submit'>ATUALIZAR DADOS</ButtonAnimated>
              </div>
            </Form>
          </div>
        }
      />
  )
}

type Props = {
  children?: React.ReactNode; // 👈️ type children
};

const Header:React.FC<Props> = ({}) =>{
  const {confirm,confirmation} = useConfirm()
  const {notify} = useToast()
  const {user} = useAuth()
  const {status} = useSession()
  const [toogle,setToogle] = useState(false)
  const [updateOn,setUpdateOn] = useState(false)

  useEffect(() =>{
    if(confirmation.hasConfirm){
      console.log("chamar endpoint passando valor e id")

      notify({
        message:"Em ate 24 horas seu valor estará disponível",
        types:'success'
      })
    }
  },[confirmation.hasConfirm, notify])

  return (
    <Container>
      <div className="px-5 h-20   sticky  z-10 flex-shrink-0 flex shadow-header  bg-[rgba(0,0,0,0.5)]  ">
        <div className=' items-center max-w-5xl  mx-auto flex w-full justify-between'>
        <Link legacyBehavior href="/">
          <Image className='cursor-pointer' src={'/images/estribados.svg'}  width={150} height={40} alt="logo do sistema"/>
        </Link>
        
          {user?.isAdmin &&
            <div>
              <nav>
                <ul className=' mx-4 flex items-center'>
                  <li className='relative'>
                    <NavLink href="/usuarios"  activeClassName="activeNavLink">
                      <a className='text-xs md:text-base'>USUARIOS</a>
                    </NavLink>
                  </li>
                  <li className='ml-5 relative '>
                    <NavLink href="/roletas"  activeClassName="activeNavLink">
                      <a className='text-xs md:text-base'>ROLETAS</a>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          }

          {
          status === 'authenticated' ?
          <div  className="relative dropdown dropdown-end">
            <label className="btn btn-circle swap swap-rotate">
              <input onChange={(e) => setToogle(e.target.checked)} type="checkbox" />
              <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
              <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
            </label>
            <Transition.Root show={toogle} as={Fragment}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >


              <ul style={{zIndex:999999}}  className={`${!toogle && 'hidden'} absolute z-50 right-0 menu  p-2 shadow bg-base-100 rounded-box text w-52 mt-4`}>
                <li onClick={() =>confirm({
                  title:"RESGATAR PRÊMIO" ,
                  text:"Apos solicitar um valor ele estara disponivel na conta registrada em ate 24 horas"
                })}>
                  <a className='text-gold100'>Resgatar Saldo</a>
                </li> 
                <li onClick={() =>{setUpdateOn(true)}}>
                  <a className='text-gold100'>Atualizar Perfil</a>
                </li>

              <li onClick={() =>{signOut({redirect:true})}}>
                <a className='flex items-center justify-center text-red-500 font-bold  bg-red-300'>Sair</a>
              </li>
              </ul>
              
              </Transition.Child>
            </Transition.Root>
          </div>
          :
          <Link legacyBehavior href="login">
            <a>
              <ButtonGoldOutLined  title='Entrar'/>
            </a>
          </Link>
        }
        </div>
      </div>
      <Modal openModal={setUpdateOn} hasOpen={updateOn} />
    </Container>
  );
}
export default Header