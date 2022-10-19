import React from 'react'

import { Container } from './styles'

interface ButtonProps{
  title:string
}
const ButtonGold:React.FC<ButtonProps> = ({title}) =>{
  return(
    <Container>
      <button className=" btn rounded-md btn-outline btn-warning">{title}</button>
    </Container>
  )
}
export default ButtonGold