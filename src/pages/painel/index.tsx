import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

const Painel:React.FC = () =>{
  return(
    <>

    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req}) =>{
  const session = await getSession({req})
    return {
      redirect:{
        destination:'/painel/roleta',
        permanent:false
      }
    }
}


export default Painel