import { NextApiRequest, NextApiResponse } from 'next';

import apiMp from 'services/apiMp';

export default async function createPayment(req:NextApiRequest,res:NextApiResponse){
  const {creditSolicitation,userId} = req.body

 const response =await apiMp.post(`checkout/preferences?access_token=${process.env.ACCESS_TOKEN_MP}`,{
    items: [
      {
        id:userId,
        title: "Creditos - Estribados.com",
        unit_price: creditSolicitation,
        quantity: 1,
        currency_id:"BRL"
      }
    ]
  })

  return res.status(200).json(response.data)

}