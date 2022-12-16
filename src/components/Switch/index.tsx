import React, { useState } from 'react'
import Switch from "react-switch";
import api from 'services/api';
import { queryClient } from 'services/queryClient';


interface SwitchProps{
  active:boolean
  roulleteId:string
}


const SwitchRoullete:React.FC<SwitchProps> = ({active,roulleteId}) =>{

  const changeRoullete = async () =>{
   await api.patch('roulletes/updateStatus',{
      id:roulleteId,
      active: !active
    })


  await queryClient.invalidateQueries('roulletes')
  }


  return <Switch onChange={changeRoullete} checked={active} />
  
}
export default SwitchRoullete