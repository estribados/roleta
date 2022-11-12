import { useWin } from 'hooks/useWin';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

import { currencyFormat } from '../../utils/currencyNumber';
import { Arrow, Container, RoulleteContainer, Spin } from './styles';

export interface WheelData {
  option: string;
  style?: StyleType;
}
export interface StyleType {
  backgroundColor?: string;
  textColor?: string;
}

interface RoulleteProps{
data:Array<WheelData>
disabled?:boolean
setStopRoullet?(value:boolean):void
}

const Roullete:React.FC<RoulleteProps> = ({data,disabled = false, setStopRoullet}) =>{
  const {isWin,activeWin} = useWin()

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState<number>();

  const handleSpinClick = () => {
    if(!disabled){
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

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

  const formatCurrencyData = currencyFormat(data)

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
          data={formatCurrencyData}
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