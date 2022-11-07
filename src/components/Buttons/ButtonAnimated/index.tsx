import React, { ButtonHTMLAttributes } from 'react'
import Ripples from 'react-ripples'
import { Container } from './styles'

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
  animation?:boolean
  children?:JSX.Element | string | JSX.Element[]
}

const ButtonAnimated:React.FC<ButtonProps> = ({animation,children, ...rest}) =>{
  return(
    <Container className='flex items-center justify-center w-full  text-white' {...rest} animation ={animation}>
      <Ripples during={900} className='text-xs flex items-center justify-center h-full w-full' >
      {children}
      </Ripples>
    </Container>
  )
}
export { ButtonAnimated }

