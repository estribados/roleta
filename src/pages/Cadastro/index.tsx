import { FormHandles } from '@unform/core';
import { Form } from "@unform/web";
import React, { useCallback, useRef } from 'react';
import { FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import { BackButton, ButtonAnimated } from 'components/Buttons';
import { Input } from 'components/Form';
import Header from 'components/Header';
import { AnimationContainer, Background, Container, ContainerBg, Content } from 'styles/signUp';
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
    <ContainerBg>
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
                <Input id='email' name="email" icon={FiUser} type="text"  placeholder="Digite seu nome" />
              </label>

              <label htmlFor="email">
                Telefone
                <Input id='email' name="email" icon={FiPhone}  placeholder="Digite seu numero" />
              </label>

              <label htmlFor="email">
                Email
                <Input id='email' name="email" icon={FiMail} type="email"  placeholder="Digite um email valido" />
              </label>

              <label htmlFor="password">
                Senha
                <Input id='password' name="password" icon={FiLock} placeholder="A senha deve conter até 6 digitos" type="password" />
              </label>

              <div className='mt-5 w-full'>
                <ButtonAnimated  type='submit' ><> CADASTRAR</></ButtonAnimated>
              </div>
            </Form>
          </AnimationContainer>
        </Content>
        <Background>

        </Background>

    </Container>
    </ContainerBg>
  )
}
export default SignIn