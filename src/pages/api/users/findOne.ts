import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from './../../../lib/prisma';

export default async function findUser(req:NextApiRequest,res:NextApiResponse){
  const {name,last_name,email,password,bank,pix,telephone} = req.body
  const data = await getSession()

  const user = await prisma.user.findFirst({
    where:{
      email:email as string
    }
  })  

  if(user){
    return res.status(201).json(user)
  }else{
    const user = await prisma.user.create({
      data:{
        email,
        name
      }
    })

    return user
  }
}