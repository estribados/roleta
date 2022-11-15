import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { ButtonAnimated } from 'components/Buttons';
import Header from 'components/Header';
import HeaderRoullete from 'components/HeaderRoullete';
import { Container, Content } from 'styles/roleta';
import { staticData } from 'utils/staticRoullete';

const DynamicComponentWithNoSSR = dynamic(
  () => import('components/Roullete'),
  { ssr: false }
)

export default function Roleta() {
  const audioRef = useRef(null)

  return (
      <Container >
        <Header/>
        <HeaderRoullete/>
        <Content>
          <section className='md:max-w-sm'>
            <div className='  mb-14 md:mb-0 justify-between md:h-full  flex flex-col'>
              <div>
                <h1 className='saldo'>SALDO DISPONIVEL <br/>  
                  <span className='font-extrabold text-5xl block'>
                    {'R$ 1700.00'}
                  </span>
                </h1>
              </div>

              <div className='hidden md:flex text-2xl md:text-3xl mt-auto  justify-center items-center w-full md:h-16 h-10 bg-black border-solid border-2 border-gold100 font-bold bg-opacity-60 rounded-md'>
                  R$ 100,00
                </div>

              <div className=' md:mt-5 mt-2'  >
                <ButtonAnimated  animation >COMPRAR CREDITOS</ButtonAnimated>
              </div>
              
            </div>
          </section>
          <div className='containerRoullete'>
            <div className='responsive-container absolute right-2 md:-right-4 md:bottom-1  bottom-24 '>
              <DynamicComponentWithNoSSR data={staticData}/>
            </div>
          </div>
          <div className='visible md:invisible text-2xl md:text-3xl mt-auto flex justify-center items-center w-full md:h-16 h-10 bg-black border-solid border-2 border-gold100 font-bold bg-opacity-60 rounded-md'>
            R$ 100,00
          </div>
        </Content>
      </Container>

  );
}
