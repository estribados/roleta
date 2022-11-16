import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

export default async function login(req:NextApiRequest,res:NextApiResponse){
  const {email,password} = req.body

  const user = await prisma.user.findFirst({
    where:{
      email:email as string,
      password:password
    }
  })  


  if(!user){
    return res.status(404).json('usuario nao encontrado')

  }

  if(user){
    return res.status(200).json(user)
  }
}