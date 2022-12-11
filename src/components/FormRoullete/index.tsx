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
import api from 'services/api'
import { useQuery } from 'react-query'
import { IRoullete, IRoulleteQuota } from 'interfaces/types'

const DynamicComponentWithNoSSR = dynamic(
  () => import('components/Roullete'),
  { ssr: false }
)

interface dataRoulleteProps{
  color?:string | undefined
  value?:number | undefined
  percentage?:number | undefined
}
interface FormProps{
  id?:string
}

const FormRoullete:React.FC<FormProps> = ({id}) =>{
  const {data:roullete} = useQuery<IRoulleteQuota>(['roulleteShow',id], async () =>{
    if(id){
      const response = await api.get('roulletes/getRoullete',{
        params:{
          id
        }
      })
      return response.data
    }
  })

  const formRef= useRef<FormHandles>(null)
  const [hasOpen,setHasOpen] = useState(false)
  const [lineInput,setLineInput] = useState<dataRoulleteProps>()
  const [nameForm,setNameForm] = useState(() =>{
    const newQuotas = roullete?.quotas.map((quota) =>{
      const newQuota = {
        value:quota.valueQuota,
        percentage:quota.percentageQuota,
        color:quota.color
      }

      return newQuota
    })

    if(id){
      if(newQuotas){
        return newQuotas
      }else{
        return [{value:0,percentage:0,color:'#000000'}]
      }
    }else{
      return [
        {value:0,percentage:0,color:'#000000'},
      ]
  }

  }
    
  )

  const changeValues = ({value,percentage,color}:dataRoulleteProps, index:number) =>{
    setLineInput({value,percentage,color})

    if(percentage) nameForm[index].percentage = percentage
    if(value) nameForm[index].value = value
    if(color) nameForm[index].color = color

    setLineInput({percentage:0,value:0,color:'#000000'})
  }

  const duplicateInput = () =>{
    setNameForm(oldArray => [...oldArray, {value:0,percentage:0,color:'#000000'}]);
  }

  const removeLineInput = (index:number) =>{
    const updateList = [...nameForm]

    if(nameForm.length > 1){
      updateList.splice(index,1)
      setNameForm(updateList)
    }
  }

  const updateRoullete = async ({id,itens,roullete}:{id:string,roullete:{nameCategory:string,valueCategory:string},itens:dataRoulleteProps}) => {

  }

  const  createRoullete = async ({itens,roullete}:{roullete:{nameCategory:string,valueCategory:string},itens:dataRoulleteProps}) => {
    await api.post('roulletes/create',{
      nameCategory:roullete.nameCategory,
      price_roullete:roullete.valueCategory,
      quotas:itens
    })
  }

  const handleSubmit= useCallback(async(data:{nameCategory:string,valueCategory:string}) =>{
    try{

      formRef.current?.setErrors({});

      if(id){
        updateRoullete({
          id,
          itens:nameForm as dataRoulleteProps,
          roullete:{
            nameCategory:data.nameCategory,
            valueCategory:data.valueCategory
          }
        })
      }else{
        createRoullete({
          itens:nameForm as dataRoulleteProps,
          roullete:{
            nameCategory:data.nameCategory,
            valueCategory:data.valueCategory
          }
        })
      }
     
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return
      }
    }
  },[id, nameForm])

  if(id && !roullete){
    return <h1>carregando</h1>
  }

  return(
    <>
      <Header/>
      <Container>
        <div className='w-full h-full flex justify-between md:mt-2 mt-5  '>
          <div className='w-full md:w-1/2 border-r-2 px-5'>

            <div className='flex justify-between items-center'>
            <h1 className='md:text-2xl md:text-center text-left text-1xl   '>CADASTRO DE ROLETA</h1>
            <BackButton  path='/roletas' title={'Cadastrar'}/>
            </div>

            <Form initialData={{nameCategory:roullete?.nameCategory,valueCategory:roullete?.price_roullete}} className='mt-5 w-full overflow-y-auto max-h-[500px]' ref={formRef} onSubmit={handleSubmit}>
              <ContainerLabel >
                <Label htmlFor="nome">
                  <p className='text-gray-300 font-bold'>
                    Categoria da Roleta
                  </p>
                  <Input style={{color:'black'}} id='nameCategory' name="nameCategory" type="text"  placeholder="Ex: Prata,Ouro" />
                </Label>

                <Label htmlFor="nome">
                  <p className='text-gray-300 font-bold'>
                    Valor da Categoria
                  </p>
                  <Input style={{color:'black'}} id='valueCategory' name="valueCategory" type="text"  placeholder="Valor por jogada" />
                </Label>
              </ContainerLabel >
                <button onClick ={() =>{setHasOpen(true)}} className=' md:hidden mt-5 flex items-center btn btn-outline btn-info btn-sm'>Ver Roleta <AiFillEye className='ml-5'/></button>
                {nameForm?.map((item,index) =>{
                  return(
                  <div key={index} className='bg-black50 shadow-sm my-2 p-2 rounded-md flex flex-col md:flex-row  justify-between gap-0 md:gap-5 w-full items-end'>
                    <div className='  w-full'>
                      <label htmlFor="" className=' text-sm'>Valor</label>
                      <input defaultValue={item.value} onBlur={(e) =>{changeValues({...lineInput,value:Number(e.target.value)},index)}} type="text" placeholder="Cota" className="md:mb-0 mb-2 text-black  input-sm bg-white input input-bordered input-warning w-full max-w-xs" />
                    </div>

                    <div className='  w-full'>
                      <label className='text-sm' htmlFor="">Porcentagem </label>
                      <input defaultValue={item.percentage} onBlur={(e) =>{changeValues({...lineInput,percentage:Number(e.target.value)},index)}} type="text" placeholder="% Acerto" className="md:mb-0 mb-2 text-black input-sm  bg-white input input-bordered input-warning w-full max-w-xs" />
                    </div>

                    <div className=' w-full'>
                      <label htmlFor="" className='text-sm'>Cor de fundo</label>
                      <input type={'color'} placeholder="Type here"  onBlur={(e) =>{changeValues({...lineInput,color:e.target.value},index)}} className="md:mb-0 mb-4 input-sm bg-white input input-bordered input-warning w-full max-w-xs" />
                    </div>
                    
                    {nameForm.length > 1 
                    &&
                    <button onClick={() =>{removeLineInput(index)}} className={"md:w-10 w-full btn btn-outline btn-error btn-sm"}>
                      <AiOutlineClose  color='red' size={20}/>
                    </button>
                    }
                    
                  </div>
                  )
                })}
              <div className='mb-5 flex gap-5'>
                <ButtonAnimated type='button'  onClick={duplicateInput} animation={false}><IoMdAdd/></ButtonAnimated>
                <ButtonAnimated  type='submit' animation={false}>Salvar</ButtonAnimated>
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

export default FormRoullete