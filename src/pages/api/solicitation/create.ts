import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function create(req:NextApiRequest,res:NextApiResponse){
  const {userId,value_solicitation} = req.body
  
  const user = await prisma.user.findFirst({
    where:{
      id:userId
    },
    include:{
      solicitations:{
        where:{
          status:{
            equals:'SOLICITADO'
          }
        }
      }
    }
  })

  const request_validations = !!user?.solicitations.length || value_solicitation > (user?.credits || 0) 
  
  if(!user?.pix && !user?.bank){
    return res.status(422).json({err:'Para fazer uma solicitação atualize o banco e o pix de sua conta'})
  }

  if(request_validations){
    return res.status(422).json({err:'Não é possivel realizar essa solicitação'})
  }

  const solicitations = await prisma.solicitation.create({
    data:{
      userId,
      value_solicitation
    }
  })

  return res.status(201).json(solicitations)
}