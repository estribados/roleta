import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import Lottie from 'react-lottie';

import * as animationData from '../../public/lotties/congratulations.json';
import { ButtonAnimated } from '../components/Buttons/ButtonAnimated';
import Layout from '../components/layout';
import { Container, ContainerImage } from '../styles/home';
import { staticData } from '../utils/staticRoullete';

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
      <Container className='overflow-hidden md:p-0 p-4'>
      <div className='fixed w-full md:-right-60 right-60  z-5 '>
            <Lottie width={'700px'} height={"100vh"} options={defaultOptions} isStopped={stopRoullete}isPaused={false}/>
          </div>
        <section className='md:mt-0 mb-14'>
          <h1>
            Sabia que aquela moeda <br/> esquecida no fundo da gaveta <br/> pode tirar você do sufoco?
          </h1>

          <ContainerImage >
            <div className='animation'>
            </div>
            <div>
              <Image className='img' src={'/images/elemento.svg'} style={{marginLeft:"-23px"}} width="200" height={'300px'}  alt="elemento"/>
              <div>
                <p>
                  Com apenas uma rodada voce pode ganhar um <span className='text-gold100 font-semibold'>PREMIO INCRIVEL</span>
                </p>
                <p>
                  É rápido, fácil, seguro e <span className='text-gold100'> SEM <br/> BUROCRACIA</span> 
                </p>
              </div>
            </div>
            <div className='invisibleButton'>
              <ButtonAnimated/>
            </div>
          </ContainerImage>
        </section>
        
        <aside>
          <div className='w-full right-20 z-50 '>

          </div>
          <DynamicComponentWithNoSSR setStopRoullet={setStopRoullet}  data={staticData}/>
          
        </aside>
        <div className='visibleButton'>
          <ButtonAnimated/>
        </div>
      </Container>
    </Layout>
  );
}
