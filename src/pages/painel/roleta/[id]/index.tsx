import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

import { ButtonMP } from 'components/Buttons';
import Header from 'components/Header';
import HeaderRoullete from 'components/HeaderRoullete';
import { useAuth } from 'hooks/useAuth';
import { Container, Content } from 'styles/roleta';
import api from 'services/api';
import { useEffect, useState } from 'react';
import { IRoullete, RoulleteQuotas } from 'interfaces/types';

const DynamicComponentWithNoSSR = dynamic(
  () => import('components/Roullete'),
  { ssr: false }
)

export default function Roleta(quotas:RoulleteQuotas) {
  let {authentication} = useAuth()
  const [roulletes,setRoulletes] = useState<IRoullete[]>([])
  const [result,setResult] = useState<number>()

  useEffect(() =>{
    api.get('roulletes/getRoulletes',{
      params:{
        status:'ATIVA'
      }
    })
    .then((result) =>{
      setRoulletes(result.data)
    })
  },[])

  return (
      <Container >
        <HeaderRoullete roulletes={roulletes} />
        <Content>
          <section className='md:max-w-sm'>
            <div className='mb-14 md:mb-0 justify-between md:h-full  flex flex-col'>
              <div>
                <h1 className='saldo'>SALDO DISPONIVEL <br/>  
                  <span className='font-extrabold text-5xl block'>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(authentication?.user.credits || 0)}
                  </span>
                </h1>
              </div>

              <div className='hidden md:flex text-2xl md:text-3xl mt-auto  justify-center items-center w-full md:h-16 h-10 bg-black border-solid border-2 border-gold100 font-bold bg-opacity-60 rounded-md'>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result || 0)}
              </div>

              <div className=' md:mt-5 mt-2'  >
                <ButtonMP  animation >
                  COMPRAR CREDITOS
                </ButtonMP>
              </div>
              
            </div>
          </section>
          <div className='containerRoullete'>
            <div className='responsive-container absolute right-2 md:-right-4 md:bottom-1  bottom-20 '>
              <DynamicComponentWithNoSSR getResult={setResult} item={quotas as RoulleteQuotas}/>
            </div>
          </div>
          <div className='visible md:invisible text-2xl md:text-3xl mt-auto flex justify-center items-center w-full md:h-16 h-10 bg-black border-solid border-2 border-gold100 font-bold bg-opacity-60 rounded-md'>
            R$ 100,00
          </div>
        </Content>
      </Container>
  );
}


export const getServerSideProps: GetServerSideProps = async ({req,query}) =>{
  const session = await getSession({req})

  const {id} = query

 const response = await api.get(`roulletes/getRoullete`,{
    params:{
      id
    }
  })

  const result = {roullete:response.data,data:response.data.quotas}


  if(!session){
    return {
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }

  return {
    props:result
  }
}
