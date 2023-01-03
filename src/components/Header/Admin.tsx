import React from 'react'
import { NavLink } from 'components/NavLink';

const AdminActions:React.FC = () =>{
  return(
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
  )
}
export  {AdminActions}