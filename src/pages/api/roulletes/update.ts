import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function update(req:NextApiRequest,res:NextApiResponse){
  const {id,itens,roullete} = req.body

 const rol = await prisma.roulletes.update({
    data:{
      nameCategory:roullete.nameCategory,
      price_roullete:roullete.valueCategory
    },
    where:{
      id
    }
  })


  itens.map(async(item:any) =>{

    await prisma.quotas.upsert({
      where:{
       id:item.id ?? '123'
      },
      update: {
        color:item.color,
        percentageQuota:item.percentageQuota,
        valueQuota:item.valueQuota
      },
      create: {
        color:item.color,
        percentageQuota:item.percentageQuota,
        valueQuota:item.valueQuota,
        roulleteId:rol.id
      },
    })
  })

  return res.status(201).json({})
}