import React, { useCallback, useRef, useState } from 'react'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { BackButton, ButtonAnimated } from 'components/Buttons'
import { Input } from 'components/Form'
import Header from 'components/Header'
import { DefaultModal } from 'components/Modals/DefaultModal'
import dynamic from 'next/dynamic'
import { AiFillEye, AiOutlineClose } from 'react-icons/ai'
import { FiX } from 'react-icons/fi'
import { IoMdAdd } from 'react-icons/io'
import { Container } from 'styles/global'
import { ContainerLabel, Label } from 'styles/roletas/roletas'
import getValidationErrors from 'utils/getValidationErros'
import { staticData } from 'utils/staticRoullete'
import * as Yup from 'yup'


const DynamicComponentWithNoSSR = dynamic(
  () => import('components/Roullete'),
  { ssr: false }
)

const Cadastro:React.FC = () =>{

  const formRef= useRef<FormHandles>(null)
  const [hasOpen,setHasOpen] = useState(false)

  const [nameForm,setNameForm] = useState(
    [
      {day:'',time:''},
    ]
  )

  
  const changeValues = ({time,day}:any, index:number) =>{
    if(time){
      nameForm[index].time = time
    }
    
    if(day){
      nameForm[index].day = day
    }
  }

  const duplicateInput = () =>{
    setNameForm(oldArray => [...oldArray, {day:'',time:''}]);
  }

  const removeLineInput = (index:number) =>{
    const updateList = [...nameForm]
    const c = updateList.splice(index,1)
    setNameForm(updateList)
  }

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
        <div className='w-full h-full flex justify-between md:mt-20 mt-5  '>
          <div className='w-full md:w-1/2 border-r-2 px-5'>

            <div className='  flex justify-between items-center'>
            <h1 className='md:text-2xl md:text-center text-left text-1xl   '>CADASTRO DE ROLETA</h1>
            <BackButton  path='/roletas' title={'Cadastrar'}/>
            </div>

            <Form className='mt-5 w-full overflow-y-auto max-h-[500px]' ref={formRef} onSubmit={handleSubmit}>
              <ContainerLabel >
                <Label htmlFor="nome">
                  <p className='text-gray-300 font-bold'>
                    Categoria da Roleta
                  </p>
                  <Input id='nome' name="nome" type="text"  placeholder="Ex: Prata,Ouro" />
                </Label>

                <Label htmlFor="nome">
                  <p className='text-gray-300 font-bold'>
                    Valor da Categoria
                  </p>
                  <Input  id='nome' name="nome" type="text"  placeholder="Valor por jogada" />
                </Label>
              </ContainerLabel >
                <button onClick ={() =>{setHasOpen(true)}} className=' md:hidden mt-5 flex items-center btn btn-outline btn-info btn-sm'>Ver Roleta <AiFillEye className='ml-5'/></button>
              {nameForm.map((item,index) =>{
                return(
                <div key={index} className='bg-black50 shadow-sm my-2 p-2 rounded-md flex flex-col md:flex-row  justify-between gap-0 md:gap-5 w-full items-end'>
                  <div className='  w-full'>
                    <label htmlFor="" className=' text-sm'>Valor</label>
                    <input type="text" placeholder="Cota" className="md:mb-0 mb-2 input-sm bg-white input input-bordered input-warning w-full max-w-xs" />

                  </div>

                  <div className=' w-full'>
                    <label className='text-sm' htmlFor="">Porcentagem </label>
                    <input type="text" placeholder="% Acerto" className="md:mb-0 mb-2 input-sm bg-white input input-bordered input-warning w-full max-w-xs" />
                  </div>

                  <div className=' w-full'>
                    <label htmlFor="" className='text-sm'>Cor de fundo</label>
                    <input type={'color'} placeholder="Type here" className="md:mb-0 mb-4 input-sm bg-white input input-bordered input-warning w-full max-w-xs" />
                  </div>
                  
                  <button className={"md:w-10 w-full btn btn-outline btn-error btn-sm"}>
                    <AiOutlineClose onClick={() =>{removeLineInput(index)}} color='red' size={20}/>
                  </button>
                  
                </div>
                )
              })}
              <div className='mb-5'>

                <ButtonAnimated  onClick={duplicateInput} animation={false}><IoMdAdd/></ButtonAnimated>
              </div>
            </Form>


          </div>
          <div className='md:block hidden'>
            <DynamicComponentWithNoSSR disabled data={staticData}/>
          </div>
        </div>
      </Container>

      <DefaultModal
        width="100%"
        margin="auto 0"
        isOpen={hasOpen}
        setIsOpen={() =>{setHasOpen(true)}}
        content={
          <div className='relative'>
            <header className='flex w-full justify-between items-center text-black mb-5'>
              ROLETA
              <FiX cursor={'pointer'} onClick={() =>{setHasOpen(false)}}/>
            </header>
            
            <div className='ml-5 flex items-center justify-center w-full h-full'>
            <DynamicComponentWithNoSSR disabled data={staticData}/>
          </div>
          </div>
        }
      />
    </>
  )
}
export default Cadastro