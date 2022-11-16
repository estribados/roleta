import { NextApiRequest, NextApiResponse } from 'next';

import { compare } from 'bcryptjs';
import { prisma } from '../../../lib/prisma';
export default async function login(req:NextApiRequest,res:NextApiResponse){
  const {email,password} = req.body

  const user = await prisma.user.findFirst({
    where:{
      email:email as string,
    }
  })  

  if(!user){
    return res.status(404).json('usuario não encontrado')
  }else if(user?.password){
    const passwordmatcher = await compare(password, user.password)
    if(!passwordmatcher){
      return res.status(401).json(user)
    }
    return res.status(200).json(user)
  }
 
}