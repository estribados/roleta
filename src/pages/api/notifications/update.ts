import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function update(req:NextApiRequest,res:NextApiResponse){
  const {userId} = req.body
  const notification = await prisma.notifications.updateMany({
    where:{
      userId,
      visualized:{
        equals:false
      }
    },
    data:{
      visualized:true
    }
  })
  return res.status(201).json(notification)
}