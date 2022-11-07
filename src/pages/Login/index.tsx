import { FormHandles } from '@unform/core';
import { Form } from "@unform/web";
import React, { useCallback, useRef } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { ButtonAnimated } from 'components/Buttons';
import { Input } from 'components/Form';
import Header from 'components/Header';
import { Facebook, Google } from 'components/Icons';
import Link from 'next/link';
import { AnimationContainer, Background, Container, Content } from 'styles/login';
import getValidationErrors from 'utils/getValidationErros';


const SignIn:React.FC = () =>{

  const formRef= useRef<FormHandles>(null)

  const handleSubmit= useCallback(async(data:any) =>{
    try{

      formRef.current?.setErrors({});

     
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }
      
      
    }
  },[])


  return(
    <>
      <Header/>
      <Container>

        <Background>
        </Background>

        <Content>
          <AnimationContainer>
            <div className="socialButtons w-full">
              <h5 className='mb-3'>Bem vindo(a)</h5>
                <div className='gap-5 w-full flex'>
                  <ButtonAnimated  style={{letterSpacing:'0',fontSize:'16px'}} ><><Google size={28} /> Entrar com o Google</></ButtonAnimated>
                  <ButtonAnimated style={{letterSpacing:'0',fontSize:'16px'}}><><Facebook size={30}/>Entrar com o Facebook</></ButtonAnimated>
                </div>
            </div>

            <span className="line">ou</span>

            <Form className='w-full' ref={formRef} onSubmit={handleSubmit}>
              <label htmlFor="email">
                Email
                <Input id='email' name="email" icon={FiMail}  placeholder="E-mail" />
              </label>

              <label htmlFor="password">
                Senha
                <Input id='password' name="password" icon={FiLock} placeholder="Senha" type="password" />
              </label>

              <div className='mt-5 w-full'>
                <span className='cursor-pointer text-blue-500 mb-2 block text-sm w-full text-right'>Esqueceu a senha?</span>
                <ButtonAnimated  type='submit' ><> Fazer Login</></ButtonAnimated>

                <p className='mt-2 block text-sm w-full text-left'>Voce não tem conta ? 
                  <Link legacyBehavior href="Cadastro">
                  <a>
                    <span className='cursor-pointer text-blue-500 text-sm'>Cadastro</span>
                  </a>
                  </Link>
                </p>
              </div>
            </Form>
          </AnimationContainer>
        </Content>

    </Container>
    </>
  )
}
export default SignIn