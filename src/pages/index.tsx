import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { ButtonAnimated } from 'components/Buttons';
import Header from 'components/Header';
import Link from 'next/link';
import { Container, Content } from 'styles/home';
import { staticData } from 'utils/staticRoullete';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Roullete'),
  { ssr: false }
)

export default function Home() {
  const audioRef = useRef(null)

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
            <div className='mb-14 md:mb-0'>
              <ButtonAnimated  animation >
                <Link href={'login'}>
                COMPRAR CREDITOS
                </Link>
              </ButtonAnimated>
            </div>
          </section>
        </Content>
      </Container>

  );
}
