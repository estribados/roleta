import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

import FormRoullete from 'components/FormRoullete'
import { useRouter } from 'next/router'
import api from 'services/api'
import { IRoulleteQuota } from 'interfaces/types'

const Edit :React.FC = (roullete) =>{
  const { query:{id} } = useRouter()

  const roulleteQuotas = roullete as IRoulleteQuota

  return (<FormRoullete roullete= {roulleteQuotas} id={id as string}/>)
}


export const getServerSideProps: GetServerSideProps = async ({req,params}) =>{

  const response = await api.get('roulletes/getRoullete',{
    params:{
      id:params?.id
    }
  })

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
    props:response.data
  }
}
export default Edit