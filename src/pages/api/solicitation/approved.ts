import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function approved(req:NextApiRequest,res:NextApiResponse){
  const {solicitationId,value_solicitation,creditsByUser,userId} = req.body
  const solicitation = await prisma.solicitation.findFirst({
    where:{
      id:solicitationId
    }
  })

  if(!solicitation){
    return res.status(404).json({err:'Solicitação não encontrada'})
  }

  if( Number(value_solicitation) > Number(creditsByUser) ){
    return res.status(403).json({err:`O saldo do usuário é inferior ao solicitado - Saldo: ${
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value_solicitation))
    }`})
  }

 const user = await prisma.user.update({
    where:{
      id:userId
    },
    data:{
      credits:creditsByUser - value_solicitation,
    }
  }) 
  
  const approved = await prisma.solicitation.update({
    where:{
      id:solicitationId as string
    },
    data:{
      status:"PAGO",
    }
  })

  const userApproved = {
    ...approved,
    credits:user.credits
  }

  return res.status(200).json(userApproved)
}