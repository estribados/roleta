import { Transition } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

import { useConfirm } from 'hooks/useConfirm';
import { useToast } from 'hooks/useToast';

import ButtonGoldOutLined from '../Buttons/ButtonGold';

const navigation = [
  { name: 'EMPRESAS', href: '/companies', icon:MenuAlt2Icon , current: true },
  { name: 'TEMPLATE', href: '/templates', icon:MenuAlt2Icon , current: false },
  {
    name: 'GERENCIAR USUÁRIOS',
    href: '/users',
    icon: MenuAlt2Icon,
    current: false,
  },
];

function classNames(...classes: any[]):any {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  children?: React.ReactNode; // 👈️ type children
};
const Header:React.FC<Props> = ({}) =>{
  const {confirm,confirmation} = useConfirm()
  const {notify} = useToast()
  const [toogle,setToogle] = useState(false)
  const user = true

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
    <>
      <div className="px-5 h-20   sticky  z-10 flex-shrink-0 flex shadow-header  bg-[rgba(0,0,0,0.5)]  ">
        <div className=' items-center max-w-5xl  mx-auto flex w-full justify-between'>
        <Link legacyBehavior href="/">
          <Image className='cursor-pointer' src={'/images/estribados.svg'}  width={150} height={40} alt="logo do sistema"/>
          </Link>
          {
          user ?
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

            <ul  className={`${!toogle && 'hidden'} absolute right-0 menu  p-2 shadow bg-base-100 rounded-box text w-52 mt-4`}>
           
              <li onClick={() =>confirm({
                title:"RESGATAR PRÊMIO" ,
                text:"Apos solicitar um valor ele estara disponivel na conta registrada em ate 24 horas"
              })}>
                <a className='text-gold100'>Resgatar Saldo</a></li> 
              <li>
                <a className='text-gold100'>Atualizar Perfil</a>
              </li>
              <li>
                <a className='flex items-center justify-center text-red-500 font-bold  bg-red-300'>Sair</a>
              </li>

            </ul>
            
        </Transition.Child>

            </Transition.Root>
          </div>
          :

          <Link legacyBehavior href="Login">
            <a>
              <ButtonGoldOutLined  title='Entrar'/>
            </a>
          </Link>
        }
        </div>
      </div>
    </>
  );
}
export default Header