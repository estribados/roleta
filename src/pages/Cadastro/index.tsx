import { FormHandles } from '@unform/core';
import { Form } from "@unform/web";
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import { BackButton, ButtonAnimated } from 'components/Buttons';
import { Input } from 'components/Form';
import Header from 'components/Header';
import { useToast } from 'hooks/useToast';
import api from 'services/api';
import { AnimationContainer, Container, ContainerBg, Content } from 'styles/signUp';
import getValidationErrors from 'utils/getValidationErros';

interface DataProps{
  name:string
  email:string
  telephone:string
  password:string
}

const SignUp:React.FC = () =>{
  const router = useRouter()
  const formRef= useRef<FormHandles>(null)
  const {notify} = useToast()

  const handleSubmit= useCallback(async(data:DataProps) =>{
    try{

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email:Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
        name:Yup.string().required('Nome obrigatório'),
        telephone:Yup.string().required('Telefone obrigatório'),
        password:Yup.string().required('Senha obrigatória')
      })

      await schema.validate(data,{
        abortEarly:false  
      })

      await api.post('/users/create',{
        name:data.name,
        email:data.email,
        password:data.password,
        telephone:data.telephone,
      }).then(() => router.push('/login'))

      notify({
        message:"Usuário registrado, faça o login com suas credenciais",
        types:"success"
      })

    }catch(err:any){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }

      notify({
        message:err.response.data,
        types:"error"
      })
    }
  },[notify, router])


  return(
    <ContainerBg>
      <Header/>
      <Container>
        <Content className='mx-5'>
          <AnimationContainer className=' glass px-5 py-2 rounded-lg'>
            <Form className='w-full' ref={formRef} onSubmit={handleSubmit}>
              <div className='flex justify-between md:text-lg text-sm items-center'>
                <h3 className='text-gold100 font-bold'>CADASTRO DE USUÁRIO</h3>
                  <BackButton path='login'/>
              </div>
              <label htmlFor="name">
                <p className='text-gray-300 font-bold'>
                  Nome
                </p>
                <Input id='name' name="name" icon={FiUser} type="text"  placeholder="Digite seu nome" />
              </label>

              <label htmlFor="telephone">
                <p className='text-gray-300 font-bold'>
                  Telefone
                </p>
                <Input id='telephone' name="telephone" icon={FiPhone} type={'tel'}  placeholder="Digite seu numero" />
              </label>

              <label htmlFor="email">
              <p className='text-gray-500 font-bold'>
                Email
              </p>
                <Input id='email' name="email" icon={FiMail} type="text"  placeholder="Digite um email valido" />
              </label>

              <label htmlFor="password">
              <p className='text-gray-500 font-bold'>
                Senha
              </p>
                <Input id='password' name="password" icon={FiLock} placeholder="A senha deve conter até 6 digitos" type="password" />
              </label>

              <div className='mt-5 w-full'>
                <ButtonAnimated  type='submit' ><> CADASTRAR</></ButtonAnimated>
              </div>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </ContainerBg>
  )
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

export default SignUp