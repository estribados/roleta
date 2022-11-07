import { FormHandles } from '@unform/core';
import { Form } from "@unform/web";
import React, { useCallback, useRef } from 'react';
import { FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import { BackButton, ButtonAnimated } from 'components/Buttons';
import { Input } from 'components/Form';
import Header from 'components/Header';
import { AnimationContainer, Background, Container, Content } from 'styles/signUp';
import getValidationErrors from 'utils/getValidationErros';

import Lottie from 'react-lottie';


import * as animationData from '../../../public/lotties/singUp.json';


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

        <Content>
          <AnimationContainer>
            <Form className='w-full' ref={formRef} onSubmit={handleSubmit}>
              <div className='flex justify-between md:text-lg text-sm items-center'>
                <h3>CADASTRO DE USUÁRIO</h3>
                  <BackButton path='Login'/>
              </div>
              <label htmlFor="email">
                Nome
                <Input id='email' name="email" icon={FiUser}  placeholder="E-mail" />
              </label>

              <label htmlFor="email">
                Telefone
                <Input id='email' name="email" icon={FiPhone}  placeholder="E-mail" />
              </label>

              <label htmlFor="email">
                Email
                <Input id='email' name="email" icon={FiMail}  placeholder="E-mail" />
              </label>

              <label htmlFor="password">
                Senha
                <Input id='password' name="password" icon={FiLock} placeholder="Senha" type="password" />
              </label>

              <div className='mt-5 w-full'>
                <ButtonAnimated  type='submit' ><> CADASTRAR</></ButtonAnimated>
              </div>
            </Form>
          </AnimationContainer>
        </Content>
        <Background>

        <Lottie 
          style={{maxWidth:'500px',}}
          height={"80%"}
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

        </Background>

    </Container>
    </>
  )
}
export default SignIn