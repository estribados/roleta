import React from 'react'

import { Container } from './styles'

const HeaderRoullete:React.FC = () =>{
  return(
    <Container>
      <nav>
      <li>
        Prata
        <span>
          R$ 1,00
        </span>
      </li>

      <li>
        Ouro
        <span>
          R$ 2,00
        </span>
      </li>

      <li>
        Rubi
        <span>
          R$ 3,00
        </span>
      </li>

      <li>
        Esmeralda
        <span>
          R$ 4,00
        </span>
      </li>

      <li>
        Diamante
        <span>
          R$ 5,00
        </span>
      </li>
      
      </nav>
    </Container>
  )
}
export default HeaderRoullete