import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function getRoulletesAndQuotas(req:NextApiRequest,res:NextApiResponse){

  const roulletes = await prisma.roulletes.findMany({
    include:{
      quotas:true
    },
    where:{
      status:'ATIVA'
    }
  })
  
  return res.status(201).json(roulletes)
}