import Link from 'next/link'
import React, { ButtonHTMLAttributes } from 'react'
import { TiArrowBackOutline } from 'react-icons/ti'

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
  path:string
  
}
const ButtonBack:React.FC<ButtonProps> = ({path, ...rest}) =>{
  return(
    <Link  legacyBehavior href={path}>
      <a  className='hover:text-white flex btn text-xs btn-outline btn-warning rounded-lg'>
        Voltar
        <TiArrowBackOutline style={{marginLeft:"20px"}}/>
      </a>
    </Link>
  )
}
export default ButtonBack