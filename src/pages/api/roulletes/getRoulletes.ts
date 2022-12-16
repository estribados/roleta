import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';
import { StatusRoullete } from '@prisma/client';

export default async function getRoulletes(req:NextApiRequest,res:NextApiResponse){

  const {status} = req.query

  const roulletes = await prisma.roulletes.findMany({
    orderBy:{
      price_roullete:'asc'
    },
    where:{
      status: status as StatusRoullete 
    }
  })
  
  return res.status(201).json(roulletes)
}