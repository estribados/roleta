import { Dialog, Transition } from '@headlessui/react';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { Fragment, useState } from 'react';

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
const Layout:React.FC<Props> = ({children}) =>{

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-4 space-y-1">
                      <Image className='' src={'/images/logo.png' } width={150} height={40} alt="logo do sistema"/>
                      {/* Itens do menu responsivo */}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}

        <div className=" flex flex-col">
          <div className="px-5 h-24  sticky top-0 z-10 flex-shrink-0 flex bg-blue700 shadow bg-black100">
            <button
              type="button"
              className=" border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuAlt2Icon className="h-6 w-10" aria-hidden="true" />
            </button>

            <div className=' items-center  md:max-w-5xl mx-auto flex w-full justify-between'>
              <Image className='invisible md:visible' src={'/images/estribados.svg'}  width={150} height={40} alt="logo do sistema"/>
              <ButtonGoldOutLined title='Entrar'/>
            </div>
          </div>

          <main className="flex-1">
            <div className="">
              <div className="max-w-7xl mx-auto   ">
                <div className="">
                  <div className=" max-w-5xl mx-auto h-full  bg-white10 shadow-3xl-personalized rounded-3xl">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default Layout