import { FormHandles } from '@unform/core';
import { Form } from "@unform/web";
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { ButtonAnimated } from 'components/Buttons';
import { Input } from 'components/Form';
import Header from 'components/Header';
import { Facebook, Google } from 'components/Icons';
import { useAuth } from 'hooks/useAuth';
import { AnimationContainer, Container, ContainerBg, Content } from 'styles/login';
import getValidationErrors from 'utils/getValidationErros';

interface loginProps{
  email:string
  password:string
}


export const getServerSideProps: GetServerSideProps = async ({req}) =>{
  const session = await getSession({req})

  if(session){
    return {
      redirect:{
        destination:'painel/roleta',
        permanent:false
      }
    }
  }

  return {
    props:{}
  }
}



const SignIn:React.FC = () =>{
  const router = useRouter()
  const formRef= useRef<FormHandles>(null)
  const {facebookAuth,googleAuth, emailAndPasswordAuth} = useAuth()

  const handleSubmit= useCallback(async(data:loginProps) =>{
    try{

      formRef.current?.setErrors({});

      await emailAndPasswordAuth({
        email:data.email,
        password:data.password
      })

    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }
    }
  },[emailAndPasswordAuth])

  

  return(
    <ContainerBg>
      <Header/>
      <Container>
        <Content className='mx-5'>
          <AnimationContainer className='mx-5 glass px-5 py-2 rounded-lg'>
            <div className="socialButtons text- w-full">
              <h5 className='mb-3 mt-3 l'>Bem-Vindo(a)</h5>
                <div className='gap-5 w-full flex flex-col md:flex-row'>
                  <ButtonAnimated onClick={() =>googleAuth()} textSize='text-xs'  style={{letterSpacing:'0'}} ><><Google size={28} /> Entrar com o Google</></ButtonAnimated>
                  <ButtonAnimated onClick={()=>facebookAuth()} textSize='text-xs' style={{letterSpacing:'0'}}><><Facebook size={30}/>Entrar com o Facebook</></ButtonAnimated>
                </div>
            </div>

            <span className="line">ou</span>

            <Form className='w-full' ref={formRef} onSubmit={handleSubmit}>
              <label htmlFor="email">
              <p className='text-gray-300 font-bold'>
                Email
              </p>
                <Input id='email' name="email" icon={FiMail}  placeholder="E-mail" />
              </label>

              <label htmlFor="password">
              <p className='text-gray-500 font-bold'>
                Senha
              </p>
                <Input id='password' name="password" icon={FiLock} placeholder="Senha" type="password" />
              </label>

              <div className='mt-5 w-full'>
                <span className='cursor-pointer text-blue-500 mb-2 block text-sm w-full text-right font-bold'>Esqueceu a senha?</span>
                  <ButtonAnimated  ><> Fazer Login</></ButtonAnimated>

                <p className='mt-2 block text-sm w-full text-left '>Voce não tem conta ? 
                  <Link legacyBehavior href="cadastro">
                    <a>
                      <span className='font-bold cursor-pointer text-blue-500 text-sm'>Cadastro</span>
                    </a>
                  </Link>
                </p>
              </div>
              
            </Form>
          </AnimationContainer>
        </Content>
    </Container>
    </ContainerBg>
  )
}
export default SignIn