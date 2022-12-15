import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function byName(req:NextApiRequest,res:NextApiResponse){
  const {id} = req.query
  const quotas = await prisma.quotas.findMany({
    where:{
      roulleteId:id as string
    }
  })
  
  return res.status(201).json(quotas)
}