// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from 'lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import apiMp from 'services/apiMp';


export default async function webhooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {data:{id}} = req.body

  const response = await apiMp.get(`v1/payments/${id}?access_token=${process.env.ACCESS_TOKEN_MP}`)
  const {status,transaction_amount,} = response.data

  console.log(response.data )
  const user = await getSession({ req });

  if(user){
    if(status === 'approved'){
      //atualizar usuario com creditos de transaction_amount
      await prisma.user.update({
        where:{
          id:user.user.id
        },
        data:{
          credits:user.user.credits + transaction_amount
        }
    })

    }else{
      //mandar enviar uma notificação para o usuario
    }
  }

  res.status(200).json({})
}
