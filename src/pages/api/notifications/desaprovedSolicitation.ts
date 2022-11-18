import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function desaprovedSolicitation(req:NextApiRequest,res:NextApiResponse){
  const {userId,solicitationId,textDescription} = req.body

  await prisma.solicitation.update({
    where:{
      id:solicitationId
    },
    data:{
      status:'RECUSADO'
    }
  })
  
  const notification = await prisma.notifications.create({
    data:{
      userId,
      solicitationId,
      description:textDescription
    }
  })
  return res.status(201).json(notification)
}