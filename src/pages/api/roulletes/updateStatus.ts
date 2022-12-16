import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function updateStatus(req:NextApiRequest,res:NextApiResponse){
  const {id,active} = req.body

 const roullete = await prisma.roulletes.update({
    data:{
      status: active? 'ATIVA' : 'INATIVA'
    },
    where:{
      id
    }
  })

  return res.status(201).json(roullete)
}