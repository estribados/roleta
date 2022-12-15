import api from 'services/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Roleta() {
  const {push} = useRouter()

  useEffect(() =>{
    api.get('roulletes/getRoulletes')
    .then((result) =>{
      push(`/painel/roleta/${result.data[0].id}`)
    })
  },[push])

  return <></>
}

