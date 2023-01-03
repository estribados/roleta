import { hash } from 'bcryptjs';
import { prisma } from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function updateCredits(req:NextApiRequest,res:NextApiResponse){
  const {
   userId,
   resultQuotas,
   price_roullete
  } = req.body

  const user = await prisma.user.findFirst({where:{
    id:userId
  }})

  const descontValue = resultQuotas - price_roullete

  //console.log({credits:Number(user?.credits),resultQuotas,price_roullete,descontValue})

  if(user?.credits){
   const updatedUser =  await prisma.user.update({
      data:{
        credits:Number(user?.credits) + descontValue
      },
      where:{
        id:userId
      }
    })

  return res.status(201).json({credits:updatedUser.credits})
    
  }


  return res.status(201).json({})
}

//82,75