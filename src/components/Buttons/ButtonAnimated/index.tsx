import React, { ButtonHTMLAttributes } from 'react'
import Ripples from 'react-ripples'
import { Container } from './styles'

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
  animation?:boolean
  textSize?:string
  children?:JSX.Element | string | JSX.Element[]
}

const ButtonAnimated:React.FC<ButtonProps> = ({animation,textSize,children, ...rest}) =>{
  return(
    <Container  className='flex items-center justify-center w-full   text-white' {...rest} animation ={animation}>
      <Ripples during={900}  className={`flex items-center  justify-center h-full w-full ${textSize}`} >
      {children}
      </Ripples>
    </Container>
  )
}
export { ButtonAnimated }

