import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import apiMp from 'services/apiMp';

export default async function createPayment(req:NextApiRequest,res:NextApiResponse){
  const {creditSolicitation} = req.body
  const user = await getSession({ req });
  if(user){

  const response =await apiMp.post(`v1/payments?access_token=${process.env.ACCESS_TOKEN_MP}`,{
    transaction_amount: creditSolicitation,
    description: 'Creditos - estribado.com',
    payment_method_id: 'pix',
    payer: {
      email:user?.user.email,
      first_name:user?.user.name,
      last_name:user?.user.last_name,
    },
    additional_info:{
      items:[
        {
          id:user.user.id 
        }
      ]
    }
  })

  return res.status(200).json(response.data)
}

}