import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function getRoulletes(req:NextApiRequest,res:NextApiResponse){
  const {id} = req.body
  const roullete = await prisma.roulletes.findFirst({
    where:{
      id
    }
  })
  
  return res.status(201).json(roullete)
}