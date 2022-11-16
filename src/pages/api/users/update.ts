import { hash } from 'bcryptjs';
import { prisma } from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function update(req:NextApiRequest,res:NextApiResponse){
  const {
    id,
    bank,
    name,
    last_name,
    pix,
    telephone,
    password,
    email
  } = req.body

  const hashedPassword = await hash(password,8)

  const user = await prisma.user.update({
    where:{
      id:id as string
    },
    data:{
      email,
      bank,
      name,
      last_name,
      pix,
      telephone,
      password:hashedPassword
    }
  }) 

  return res.status(201).json(user)
}