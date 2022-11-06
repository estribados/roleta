import { MenuAlt2Icon } from '@heroicons/react/outline';
import Image from 'next/image';

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
  return (
    <>
      <div className="px-5 h-24   sticky  z-10 flex-shrink-0 flex shadow-header  bg-[rgba(0,0,0,0.5)]  ">
        <div className=' items-center max-w-5xl  mx-auto flex w-full justify-between'>
          <Image className='' src={'/images/estribados.svg'}  width={150} height={40} alt="logo do sistema"/>
          <ButtonGoldOutLined title='Entrar'/>
        </div>
      </div>
    </>
  );
}
export default Header