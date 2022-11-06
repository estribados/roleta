import dynamic from 'next/dynamic';
import { useState } from 'react';

import { ButtonAnimated } from 'components/Buttons';
import Header from 'components/Header';
import { Container, Content } from 'styles/home';
import { staticData } from 'utils/staticRoullete';


const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Roullete'),
  { ssr: false }
)

export default function Home() {
  const [stopRoullete,setStopRoullet] = useState(false)

  return (
      <Container>
        <Header/>
        <Content>
          <div className='containerRoullete'>
            <div className='fixed'>
              <DynamicComponentWithNoSSR data={staticData}/>
            </div>
          </div>

          <section className=''>
            <h1>Começe a ganhar <br/>
              <a href="">
                AGORA !
              </a> 
            </h1>
            <ButtonAnimated />
          </section>
        </Content>
      </Container>

  );
}
