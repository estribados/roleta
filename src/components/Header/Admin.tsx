import React from 'react'
import { NavLink } from 'components/NavLink';

const AdminActions:React.FC = () =>{
  return(
    <div>
      <nav>
        <ul className='mx-4  items-center flex md:flex-row flex-col'>
          <li className='relative'>
            <NavLink href="/painel/usuarios"  activeClassName="activeNavLink">
              <a className='text-xs md:text-base'>USUARIOS</a>
            </NavLink>
          </li>
          <li className='md:ml-5 ml-0 relative '>
            <NavLink href="/painel/roletas"  activeClassName="activeNavLink">
              <a className='text-xs md:text-base'>ROLETAS</a>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export  {AdminActions}