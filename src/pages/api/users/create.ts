import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../lib/prisma';


export default async function createUser(req:NextApiRequest,res:NextApiResponse){
  const {name,last_name,email,password,bank,pix,telephone} = req.body

  await prisma.user.create({
    data:{
      bank,
      name,
      last_name,
      email,
      password,
      pix,
      telephone,
    }
  })

  return res.status(201).json({})
}