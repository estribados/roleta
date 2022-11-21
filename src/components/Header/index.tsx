import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineBank } from 'react-icons/ai';
import { BsBellFill } from 'react-icons/bs';
import { FiLock, FiMail, FiPhone, FiUser, FiX } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

import { ButtonAnimated } from 'components/Buttons/ButtonAnimated';
import Input from 'components/Form/Input';
import { DefaultModal } from 'components/Modals/DefaultModal';
import { NavLink } from 'components/NavLink';
import { useAuth } from 'hooks/useAuth';
import { useConfirm } from 'hooks/useConfirm';
import { useToast } from 'hooks/useToast';
import { INotifications } from 'interfaces/types';
import api from 'services/api';
import { queryClient } from 'services/queryClient';
import getValidationErrors from 'utils/getValidationErros';

import ButtonGoldOutLined from '../Buttons/ButtonGold';
import { Container, ContainerLabel, Label, Notifications } from './styles';

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

  const {authentication} = useAuth()
  const {notify} = useToast()

  const handleSubmit= useCallback(async(data:DataProps) =>{
    try{
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password:Yup.string().required('Campo obrigatório'),
        name:Yup.string().required('Campo obrigatório'),
        confirmPassword:Yup.string().oneOf([Yup.ref('password'), null], 'Senha e confirmação de senha devem ser iguais').required('Campo obrigatório'),
      })

      await schema.validate(data,{
        abortEarly:false
      })

        await api.put(`users/update`,{
          id:authentication?.user.id,
          bank:data.bank,
          name:data.name,
          last_name:data.sobrenome,
          pix:data.pix,
          telephone:data.telephone,
          password:data.password,
          email:data.email
        })
        .then((response) =>{
          openModal(false)

          notify({
            message:"Pefil Atualizado",
            types:"success"
          })
          if(authentication?.user){
            authentication.user = response.data
          }
        })

    
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }
    }
  },[authentication, notify, openModal])

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

          <Form className='w-full' initialData={{...authentication?.user,password:''}} ref={formRef} onSubmit={handleSubmit}>
            <h4 className=' w-full flex items-center after:flex after:-right-1 after:h-1 after:w-full after:max-w-[220px]  after:bg-gold100 relative after:ml-5 after:rounded-lg  text-gray-500 mb-5'>Dados Pessoais</h4>
            <ContainerLabel >
              <Label htmlFor="nome">
                <p className='text-gray-300 font-bold'>
                  Nome
                </p>
                <Input id='nome' name="name" icon={FiUser} type="text"  placeholder="Primeiro nome" />
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
                <Input id='telefone' name="telephone" icon={FiPhone} type="text"  placeholder="WhatsApp" />
              </Label>
            </ContainerLabel>

            <h4 className='w-full flex items-center after:flex after:-right-1 after:h-1 after:w-full after:max-w-[200px]  after:bg-gold100 relative after:ml-5 after:rounded-lg  text-gray-500 my-5'>Dados de Acesso</h4>
            
            <ContainerLabel>
              <Label htmlFor="email">
                <p className='text-gray-300 font-bold'>
                  Email
                </p>
                <Input disabled id='email' name="email" icon={FiMail} type="text"  placeholder="Digite um email valido" />
              </Label>

              <Label htmlFor="password">
                <p className='text-gray-300 font-bold'>
                  Senha
                </p>
                <Input id='password' name="password" icon={FiLock} type="password"  placeholder="Minimo 6 digitos" />
              </Label>

              <Label htmlFor="confirmPassword">
                <p className='text-gray-300 font-bold'>
                  Confirmação de Senha
                </p>
                <Input id='confirmPassword' name="confirmPassword" icon={FiLock} type="text"  placeholder="Repita sua senha" />
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


const Header:React.FC = () =>{
  const {confirm} = useConfirm()
  const {signOutProvider,authentication,status} = useAuth()
  const [authStatus,setAuthStatus] = useState(false)
  const [updateOn,setUpdateOn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if(status === 'authenticated'){
      setAuthStatus(true)
    }
  }, [status])

  const {data:notifications} = useQuery<INotifications[]>(['notifications',authentication?.user.id], async () =>{
    if(authentication){
      const response = await api.get('notifications/getNotificationsByUser',{
        params:{
          userId:authentication?.user.id
        }
      })
      return response.data
    }
  },{
    staleTime: 1200000 , //20 minutos,
    cacheTime: 1200000,
    refetchOnWindowFocus:false
  } )

  const updateNotifications = useCallback( async () =>{
    if(authentication?.user.id){
      await api.patch('notifications/update',{
        userId:authentication?.user.id
      })
    }

    await queryClient.invalidateQueries('notifications')
  },[authentication?.user.id])

  const hasNotificationsNotVisualized = notifications?.some((notification) => !notification.visualized)

  return (
    <Container>
      <div className="px-5 h-20   sticky  z-10 flex-shrink-0 flex shadow-header  bg-[rgba(0,0,0,0.5)]  ">
        <div className=' items-center max-w-5xl  mx-auto flex w-full justify-between'>
          <Image onClick={() =>{router.push('/')}} className='cursor-pointer' src={'/images/estribados.svg'}  width={150} height={40} alt="logo do sistema"/>
          {authentication?.user.isAdmin &&
            <div>
              <nav>
                <ul className=' mx-4 flex items-center'>
                  <li className='relative'>
                    <NavLink href="/painel/usuarios"  activeClassName="activeNavLink">
                      <a className='text-xs md:text-base'>USUARIOS</a>
                    </NavLink>
                  </li>
                  <li className='ml-5 relative '>
                    <NavLink href="/painel/roletas"  activeClassName="activeNavLink">
                      <a className='text-xs md:text-base'>ROLETAS</a>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          }

          {authStatus ?
            <div className='flex items-center rounded-xl    gap-5'>
              <Notifications hasNotificatons={hasNotificationsNotVisualized} className="rounded-xl   dropdown dropdown-end  ">
                <label tabIndex={0} className=" m-1 ">
                  <BsBellFill onClick={updateNotifications}  cursor={"pointer"} className='newNotification'/>
                </label>
                <ul tabIndex={0} className="rounded-xl   dropdown-content menu  bg-base-100 w-64">
                  <div>
                    <header className=' p-3 text-base font-bold rounded-t-xl w-full bg-gold100 h-16 flex items-center justify-start'>
                      CENTRAL DE NOTIFICAÇÕES
                    </header>
                    <div className='overflow-y-auto h-64'>
                    { !!notifications?.length ?
                    notifications?.map((notification) =>{
                        return(
                          <div key={notification?.id} className='p-3 border-gray-200 border-b-2 '>
                          <div className='w-full justify-between flex gap-2 items-center mb-3'>
                            <p className='text-base font-bold'><>{notification.solicitation?.status}</></p>
                            <span className='text-gray-300 text-sm '><>{ 
                            moment(notification.solicitation?.createdAt).format('DD/MM - H') + 'h'
                            }</></span>
                          </div>
                          <div className='text-xs'>
                            {notification.description}
                          </div>
                        </div>
                        )
                    })
                    :
                    <div className='w-full h-full flex items-center justify-center'>Nenhuma notificação</div>
                    }
                    </div>
                  </div>
                </ul>
              </Notifications>
              <div  className="dropdown dropdown-bottom dropdown-end">
                <label  tabIndex={0} className="btn btn-circle swap swap-rotate">
                  <input type="checkbox" />
                  <GiHamburgerMenu size={24}/>
                </label>
                  <ul tabIndex={0} style={{zIndex:999999}}  className={` dropdown-content menu p-2 shadow bg-base-100 rounded-box absolute z-50 right-0  text w-52 mt-4`}>
                    <li onClick={() =>{}}>
                      <Link href={'/painel/roleta'}>
                        <a className='text-gold100'>Roleta</a>
                      </Link>
                    </li> 
                    <li onClick={() =>confirm({
                      title:"RESGATAR PRÊMIO" ,
                      text:"Apos solicitar um valor ele estara disponivel na conta registrada em ate 24 horas"
                    })}>
                      <a className='text-gold100'>Resgatar Saldo</a>
                    </li> 
                    <li onClick={() =>{setUpdateOn(true)}}>
                      <a className='text-gold100'>Atualizar Perfil</a>
                    </li>

                  <li onClick={signOutProvider}>
                    <a className='flex items-center justify-center text-red-500 font-bold  bg-red-300'>Sair</a>
                  </li>
                  </ul>
              </div>

            </div>
            :
            <Link legacyBehavior href="/login">
              <a>
                <ButtonGoldOutLined  title='Entrar'/>
              </a>
            </Link>
          }
        </div>
      </div>
      {updateOn && 
        <Modal openModal={setUpdateOn} hasOpen={updateOn} />
      }
    </Container>
  );
}


export default memo(Header)

