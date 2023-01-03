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
      },


    },
  })  

  let initialValue = 0
  const total = users.reduce(function(acumulador, user) {
    const sum = acumulador + Number(user.house_profit)

    return sum
  }, initialValue)

  return res.status(201).json({users,house_profit:total.toFixed(2)})
}