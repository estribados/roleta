import { IRoullete } from 'interfaces/types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { NavLink } from 'components/NavLink'
import { GiHamburgerMenu } from 'react-icons/gi';

import { Container, ToogleMenu } from './styles'

interface HeaderProps{
  roulletes:IRoullete[]
}

const HeaderRoullete:React.FC<HeaderProps> = ({roulletes}) =>{
  const [toggle, setToogle] = useState(false)

  const {push} = useRouter()
  return(
    <>
      <ToogleMenu className="absolute right-0 top-32 z-50 btn btn-circle swap swap-rotate">
        <input type="checkbox" onChange={(e) =>{setToogle(e.target.checked)}} />
        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
      </ToogleMenu>
      <Container toggle={toggle} >
        <nav>
          {roulletes.map((roullete) =>(
            <NavLink   key={roullete.id} href={`/painel/roleta/${roullete.id}`}  activeClassName="activeNavLink">
              <a >
                {roullete.nameCategory}
                <span>
                  {
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(roullete.price_roullete)
                  }
                </span>
              </a>
            </NavLink>  
          ))}
        </nav>
      </Container>
    </>

  )
}
export default HeaderRoullete