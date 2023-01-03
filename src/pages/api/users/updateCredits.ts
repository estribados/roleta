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
  const house_profit = resultQuotas >= price_roullete ?  0 : price_roullete - resultQuotas 

  console.log({credits:Number(user?.credits),resultQuotas,price_roullete,descontValue,house_profit})
  const validationProfit = house_profit === 0 ? house_profit : house_profit.toFixed(2)

  // console.log(house_profit === 0 ? house_profit : house_profit.toFixed(2))


  if(user?.credits){
   const updatedUser =  await prisma.user.update({
      data:{
        credits:Number(user?.credits) + descontValue,
        house_profit:Number(user.house_profit) + Number(validationProfit)
      },
      where:{
        id:userId
      }
    })
  // console.log(updatedUser)



  return res.status(201).json({credits:updatedUser.credits})
    
  }


  return res.status(201).json({})
}

//82,75