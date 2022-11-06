import { MenuAlt2Icon } from '@heroicons/react/outline';
import { useState } from 'react';

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
    <div className=" ">
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

    </>
  );
}
export default Layout