// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import apiMp from 'services/apiMp';


export default function webhooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {data:{id}} = req.body

  apiMp.defaults.headers['Authorization'] = `${process.env.ACCESS_TOKEN_MP}`;

  apiMp.get(`v1/payments/${id}`)
  .then((response)=>{
    const {status,transaction_amount} = response.data

    if(status === 'approved'){
      //atualizar usuario com creditos de transaction_amount
    }else if(status === 'reject'){
      //mandar enviar uma notificação para o usuario
    }

    console.log(response.data)
  })

  res.status(200).json({})
}
