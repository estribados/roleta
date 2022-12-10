import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function getRoulletes(req:NextApiRequest,res:NextApiResponse){

  const roulletes = await prisma.roulletes.findMany()
  
  return res.status(201).json(roulletes)
}