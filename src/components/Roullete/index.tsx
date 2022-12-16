import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';
import { useWin } from 'hooks/useWin';
import { RoulleteQuotas } from 'interfaces/types';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import api from 'services/api';
import { staticData } from 'utils/staticRoullete';

import { currencyFormat } from '../../utils/currencyNumber';
import { Arrow, Container, RoulleteContainer, Spin } from './styles';



interface RoulleteProps{
staticItens?:boolean
item?:RoulleteQuotas
disabled?:boolean
setStopRoullet?(value:boolean):void
getResult?(value:number):void
}


const Roullete:React.FC<RoulleteProps> = ({item,getResult,staticItens = false,disabled = false}) =>{
  const {activeWin} = useWin()
  let {authentication,setAuthentication} = useAuth()

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState<number>();
  const [quotasFormated,setQuotasFormated] = useState<any[] | undefined>([])
  const {notify} = useToast()

  const handleSpinClick = useCallback(async()=>{
    try{

      if(!staticItens && Number(authentication?.user.credits) < Number(item?.roullete?.price_roullete)){
        throw new Error("Você não possui creditos suficientes")
      }

      if(!disabled && !staticItens){
        if(item){

        const newPrizeNumber = Math.floor(Math.random() * item?.data?.length)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
  
        setTimeout(() =>{
          const resultQuotas = item?.data[newPrizeNumber]
  
            api.patch('users/updateCredits',{
              userId:authentication?.user.id,
              resultQuotas:Number(resultQuotas?.valueQuota),
              price_roullete:Number(item?.roullete?.price_roullete)
              }).then((response) =>{
              if(getResult){
                getResult(Number(resultQuotas?.valueQuota))
              }
  
            if(authentication){
              setAuthentication({
                ...authentication,
                user:{
                  ...authentication.user,
                  credits:response.data.credits
                }
              })
            }
          })
        },12000)
      }

      }else{
        const newPrizeNumber = Math.floor(Math.random() * staticData.length)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
      }

    }catch(err:any){
      notify({
        message:err.message,
        types:'warning'
      })
    }
   
  },[authentication, disabled, getResult, item, notify, setAuthentication, staticItens])


  useEffect(() =>{
    const roulleteData = item?.data.map((quotas) =>{
      if(quotas.valueQuota){
        const mountObj = { option: quotas.valueQuota.toString(), style: { backgroundColor: quotas.color, textColor: '#fff' } }
        return mountObj
      }
    })
    if(item){
      setQuotasFormated(roulleteData)
    }
  },[item, item?.data])

  useEffect(() =>{
    if(prizeNumber){
      const timer = setTimeout(() => {
        activeWin(true)
      }, 11000);

      const timer2 = setTimeout(() => {
        activeWin(false)
      }, 14000);
    }
  },[activeWin, prizeNumber])

  const formatCurrencyData = currencyFormat(quotasFormated || [])

  return(
    <Container>
      <RoulleteContainer>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber || 0}
          spinDuration={1}
          outerBorderColor='linear-gradient(0deg, rgba(229,189,49,1) 7%, rgba(242,222,56,1) 30%, rgba(254,255,63,1) 86%)'
          outerBorderWidth={0}
          fontSize={14}
          data={staticItens ? staticData : formatCurrencyData}
          onStopSpinning={() => {
            setMustSpin(false)
          }}
        />
        <Spin disabled={disabled} active ={mustSpin} onClick={handleSpinClick}> 
          <p>
            Girar
          </p>
        </Spin>

        <Arrow>
          <Image  src="/images/seta-estrib.png" width={'80px'} height="80px" alt='seta'/>
        </Arrow>
      </RoulleteContainer>
    </Container>
  )
}
export default Roullete