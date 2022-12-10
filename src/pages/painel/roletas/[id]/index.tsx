import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

import FormRoullete from 'components/FormRoullete'
import { useRouter } from 'next/router'

const Edit :React.FC = () =>{
  const { query:{id} } = useRouter()
  return <FormRoullete id={id as string}/>
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
export default Edit