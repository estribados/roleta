import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../../public/lotties/congratulations.json';

interface WinProps{
  isWin:boolean
}

import { Container } from './styles';
const Win:React.FC<WinProps> = ({isWin}) =>{

  return(
    <Container {...(!isWin && {style:{display:'none'}})}>

      {isWin &&

      <Lottie 
      width={'100%'}
      height={"100%"}
      isClickToPauseDisabled 
      options={{
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }} 
      isStopped={false} 
      isPaused={false}
      />
    }
    </Container>
  )
}
export default Win