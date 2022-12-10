import React, { useCallback, useRef, useState } from 'react'

import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import FormRoullete from 'components/FormRoullete'

const Cadastro:React.FC = () =>{
  return <FormRoullete/>
}


export const getServerSideProps: GetServerSideProps = async ({req}) =>{
  const session = await getSession({req})
  if(!session?.user.isAdmin){
    return {
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }

  return {
    props:{}
  }
}



export default Cadastro