import dynamic from 'next/dynamic';
import Image from 'next/image';

import { ButtonAnimated } from '../components/Buttons/ButtonAnimated';
import Layout from '../components/layout';
import { staticData } from '../utils/staticRoullete';
import { Container, ContainerImage } from './styles';

import { useState } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../public/lotties/congratulations.json';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Roullete'),
  { ssr: false }
)

export default function Home() {
  const [stopRoullete,setStopRoullet] = useState(false)
  const defaultOptions = {
    loop: false,
    autoplay: stopRoullete, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Layout>
     
      <Container className='md:p-0 p-4'>
        
        <section>
          <h1>
            Sabia que aquela moeda <br/> esquecida no fundo da gaveta <br/> pode tirar você do sufoco?
          </h1>

          <ContainerImage >
          <div className='animation'>

          </div>
            <div>
              <Image src={'/images/elemento.svg'} style={{marginLeft:"-23px"}} width="200" height={'300'}  alt="elemento"/>
              <div>
                <p>
                  Com apenas uma rodada voce pode ganhar um <span className='text-gold100 font-semibold'>PREMIO INCRIVEL</span>
                </p>
                <p>
                  É rápido, fácil, seguro e <span className='text-gold100'> SEM <br/> BUROCRACIA</span> 
                </p>
              </div>
            </div>
            <ButtonAnimated/>
          </ContainerImage>
        </section>
        <aside>
        <div className='fixed right-20 z-5'>
          <Lottie 
          isClickToPauseDisabled
            options={defaultOptions}
            isStopped={stopRoullete}
            isPaused={false}
            />
        </div>
          <DynamicComponentWithNoSSR setStopRoullet={setStopRoullet}  data={staticData}/>
        </aside>
        
      </Container>
    </Layout>
  );
}
