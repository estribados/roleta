import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function find(req:NextApiRequest,res:NextApiResponse){
  const {email} = req.body
  const user = await prisma.user.findFirst({
    where:{
      email:email as string
    }
  })  

  if(user){
    return res.status(201).json(user)
  }
}