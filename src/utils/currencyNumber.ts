interface WheelProps{
  option?:string
  style?:any
}

export const currencyFormat = (data:WheelProps[]) =>{

 const formatedData =  data?.map((item) =>{
   const formatedOption =  new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2

  }).format(Number(item?.option))

  const obj = {
    ...item,
    option:formatedOption
  }

  return obj
  })
 return formatedData
}

