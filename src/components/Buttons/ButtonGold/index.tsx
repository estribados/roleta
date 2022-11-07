


import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
  title:string
  
}
const ButtonGold:React.FC<ButtonProps> = ({title, ...rest}) =>{
  return(
    <Container>
      <button {...rest} className=" btn rounded-md btn-outline btn-warning">{title}</button>
    </Container>
  )
}
export default ButtonGold