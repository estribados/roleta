import api from 'services/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Roleta() {
  const {push} = useRouter()

  useEffect(() =>{
    api.get('roulletes/getRoulletes',{
      params:{
        status:'ATIVA'
      }
    })
    .then((result) =>{
      if(!!result.data.length){
        push(`/painel/roleta/${result.data[0].id}`)
      }else{
        push(`/`)
      }
    })
  },[push])

  return <></>
}

