import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function getNotificationsByUser(req:NextApiRequest,res:NextApiResponse){
  const {userId} = req.query

  const notifications = await prisma.notifications.findMany({
    where:{
      userId:userId as string
    },
    orderBy:{
      visualized:'asc'
    },
    include:{
      solicitation:true,
      user:true
    }
  })

  return res.status(201).json(notifications)
}