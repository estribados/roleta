import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function findSolicitationsByUser(req:NextApiRequest,res:NextApiResponse){
  const {userId} = req.query
  
  const solicitations = await prisma.solicitation.findFirst({
    where:{
      id:userId as string
    }
  })

  return res.status(201).json(!!solicitations)
}