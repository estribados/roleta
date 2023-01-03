import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './../../../lib/prisma';
export default async function alg(req:NextApiRequest,res:NextApiResponse){

  const arr = [
    {valor:10,porcentagem:10},
    {valor:10,porcentagem:10},
    {valor:10,porcentagem:10},
    {valor:10,porcentagem:10},
    {valor:10,porcentagem:10},
  ]


  const aleatorio = arr.map((item,index) =>{
  var percentual = (Math.floor((Math.random() * 100)) + 1);
  var value = ((item.porcentagem > percentual) ? {pass:true,position:index} : {pass:false,position:index});

  return value

  })

  //console.log(aleatorio)
  const pass = aleatorio.find((i) => i.pass)
  if(pass){
    return res.status(201).json(pass)
  }else{
    const notPasseds = aleatorio.filter((i) => !i.pass)
    const index = (Math.floor((Math.random() * notPasseds.length)) + 1)
    const notPassed = notPasseds[index - 1]

    return res.status(201).json(notPassed)


   // console.log({bt})


  }

  // vai gerar um número de 1 a 100, para facilitar o uso do percentual e possíveis novas inclusões de valores no array
  // var percentual = (Math.floor((Math.random() * 100)) + 1);
  // var index = ((percentual > 70) ? 1 : 0);

  // var result = array[index];
  // console.log('Percentual: ' + percentual);
  // console.log(result);
  return res.status(201).json({})
}