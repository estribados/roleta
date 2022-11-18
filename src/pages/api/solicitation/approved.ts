import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function approved(req:NextApiRequest,res:NextApiResponse){
  const {solicitationId} = req.query
  
  const solicitation = await prisma.solicitation.findFirst({
    where:{
      id:solicitationId as string
    }
  })

  if(!solicitation){
    return res.status(404).json({err:'Solicitação não encontrada'})
  }
  
  const approved = await prisma.solicitation.update({
    where:{
      id:solicitationId as string
    },
    data:{
      status:"PAGO"
    }
  }) 

  return res.status(200).json(approved)
}