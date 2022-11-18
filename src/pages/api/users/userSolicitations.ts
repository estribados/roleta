import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function userSolicitation(req:NextApiRequest,res:NextApiResponse){
  const users = await prisma.user.findMany({
    include:{
      solicitations:{
        where:{
          status:{
            equals:'SOLICITADO'
          },
        },
        orderBy:{
          status:'asc'
        }
      }
    },
  })  

  return res.status(201).json(users)
}