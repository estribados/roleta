import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function create(req:NextApiRequest,res:NextApiResponse){
  const {nameCategory,price_roullete,quotas} = req.body

  const roullete = await prisma.roulletes.create({
    data:{
      nameCategory,
      price_roullete,
      quotas
    }

  })
  

  return res.status(201).json(roullete)
}