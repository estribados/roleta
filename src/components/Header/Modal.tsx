import { FormHandles } from '@unform/core'
import { Form } from '@unform/web';
import { ButtonAnimated } from 'components/Buttons';
import Input from 'components/Form/Input';
import { DefaultModal } from 'components/Modals/DefaultModal';
import { useAuth } from 'hooks/useAuth'
import { useToast } from 'hooks/useToast';
import react, { useCallback, useRef } from 'react'
import { AiOutlineBank } from 'react-icons/ai';
import { FiLock, FiMail, FiPhone, FiUser, FiX } from 'react-icons/fi';
import api from 'services/api';
import getValidationErrors from 'utils/getValidationErros';
import * as Yup from 'yup';
import { ContainerLabel, Label } from './styles';


interface ModalProps{
  openModal(value:boolean):void
  hasOpen:boolean
}


interface DataProps{
  name:string
  sobrenome:string
  telephone:string
  password:string
  email:string
  pix:string
  bank:string
}


const Modal:React.FC<ModalProps> = ({hasOpen,openModal}) => {

  const formRef= useRef<FormHandles>(null)

  const {authentication} = useAuth()
  const {notify} = useToast()

  const handleSubmit= useCallback(async(data:DataProps) =>{
    try{
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password:Yup.string().required('Campo obrigatório'),
        name:Yup.string().required('Campo obrigatório'),
        confirmPassword:Yup.string().oneOf([Yup.ref('password'), null], 'Senha e confirmação de senha devem ser iguais').required('Campo obrigatório'),
      })

      await schema.validate(data,{
        abortEarly:false
      })

        await api.put(`users/update`,{
          id:authentication?.user.id,
          bank:data.bank,
          name:data.name,
          last_name:data.sobrenome,
          pix:data.pix,
          telephone:data.telephone,
          password:data.password,
          email:data.email
        })
        .then((response) =>{
          openModal(false)

          notify({
            message:"Pefil Atualizado",
            types:"success"
          })
          if(authentication?.user){
            authentication.user = response.data
          }
        })

    
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }
    }
  },[authentication, notify, openModal])

  return(
    <DefaultModal
      width="100%"
      margin="auto 0"
      isOpen={hasOpen}
      setIsOpen={() =>{openModal(true)}}
      content={
        <div>
          <header className='flex w-full justify-between items-center text-black mb-5'>
            MEUS DADOS
            <FiX cursor={'pointer'} onClick={() =>{openModal(false)}}/>
          </header>

          <Form className='w-full' initialData={{...authentication?.user,password:''}} ref={formRef} onSubmit={handleSubmit}>
            <h4 className=' w-full flex items-center after:flex after:-right-1 after:h-1 after:w-full after:max-w-[220px]  after:bg-gold100 relative after:ml-5 after:rounded-lg  text-gray-500 mb-5'>Dados Pessoais</h4>
            <ContainerLabel >
              <Label htmlFor="nome">
                <p className='text-gray-300 font-bold'>
                  Nome
                </p>
                <Input id='nome' name="name" icon={FiUser} type="text"  placeholder="Primeiro nome" />
              </Label>

              <Label htmlFor="sobrenome">
                <p className='text-gray-300 font-bold'>
                  Sobrenome
                </p>
                <Input id='sobrenome' name="sobrenome" icon={FiUser} type="text"  placeholder="Segundo nome" />
              </Label>

              <Label htmlFor="telefone">
                <p className='text-gray-300 font-bold'>
                  Telefone
                </p>
                <Input id='telefone' name="telephone" icon={FiPhone} type="text"  placeholder="WhatsApp" />
              </Label>
            </ContainerLabel>

            <h4 className='w-full flex items-center after:flex after:-right-1 after:h-1 after:w-full after:max-w-[200px]  after:bg-gold100 relative after:ml-5 after:rounded-lg  text-gray-500 my-5'>Dados de Acesso</h4>
            
            <ContainerLabel>
              <Label htmlFor="email">
                <p className='text-gray-300 font-bold'>
                  Email
                </p>
                <Input disabled id='email' name="email" icon={FiMail} type="text"  placeholder="Digite um email valido" />
              </Label>

              <Label htmlFor="password">
                <p className='text-gray-300 font-bold'>
                  Senha
                </p>
                <Input id='password' name="password" icon={FiLock} type="password"  placeholder="Minimo 6 digitos" />
              </Label>

              <Label htmlFor="confirmPassword">
                <p className='text-gray-300 font-bold'>
                  Confirmação de Senha
                </p>
                <Input id='confirmPassword' name="confirmPassword" icon={FiLock} type="text"  placeholder="Repita sua senha" />
              </Label>
            </ContainerLabel>

            <h4 className='w-full flex items-center after:flex after:-right-1 after:h-1 after:w-full after:max-w-[170px]  after:bg-gold100 relative after:ml-5 after:rounded-lg  text-gray-500 my-5'>Dados de Bancarios</h4>

            <ContainerLabel>
              <Label htmlFor="pix">
                <p className='text-gray-300 font-bold'>
                  Pix
                </p>
                <Input id='pix' name="pix" icon={AiOutlineBank} type="text"  placeholder="Pix para deposito" />
              </Label>

              <Label htmlFor="bank">
                <p className='text-gray-300 font-bold'>
                  Banco
                </p>
                <Input id='bank' name="bank" icon={AiOutlineBank} type="text"  placeholder="Banco do pix" />
              </Label>
            </ContainerLabel>
            <div className='mt-5'>
              <ButtonAnimated animation={false} type='submit'>ATUALIZAR DADOS</ButtonAnimated>
            </div>
          </Form>
        </div>
      }
    />
  )
}

export {Modal}