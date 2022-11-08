import React, { ButtonHTMLAttributes } from 'react'
import Ripples from 'react-ripples'
import { Container, ContainerAnimated } from './styles'

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
  animation?:boolean
  textSize?:string
  children?:JSX.Element | string | JSX.Element[]
}

const ButtonAnimated:React.FC<ButtonProps> = ({animation,textSize,children, ...rest}) =>{
  return(
    <ContainerAnimated animation ={animation}>
      <Ripples during={900}  className={`flex items-center  justify-center h-full w-full ${textSize}`} >
        <Container  className='flex items-center justify-center w-full   text-white' {...rest} >
          {children}
        </Container>
      </Ripples>
    </ContainerAnimated>
  )
}
export { ButtonAnimated }

