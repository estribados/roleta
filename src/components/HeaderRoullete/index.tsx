import { IRoullete } from 'interfaces/types'
import { useRouter } from 'next/router'
import React from 'react'
import { NavLink } from 'components/NavLink'

import { Container } from './styles'

interface HeaderProps{
  roulletes:IRoullete[]
}

const HeaderRoullete:React.FC<HeaderProps> = ({roulletes}) =>{

  const {push} = useRouter()
  return(
    <Container>
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
  )
}
export default HeaderRoullete