import { IQuotas, IRoullete } from "interfaces/types";

const reducer = () => {};

const radomResult = (data: IQuotas[], roullete: IRoullete) => {
  const aleatorio = data.map((item, index) => {
    var percentual = Math.floor(Math.random() * 100) + 1;
    if (item.percentageQuota) {
      var value =
        Number(item.percentageQuota) >= percentual
          ? {
              pass: true,
              position: index,
              value: item.valueQuota,
              percentageQuota: item.percentageQuota,
            }
          : {
              pass: false,
              position: index,
              value: item.valueQuota,
              percentageQuota: item.percentageQuota,
            };
      return value;
    }
  });

  const pass = aleatorio.find((i) => {
    return i?.pass;
  });
  let passeds = aleatorio.filter((i) => {
    return i?.pass;
  });

  if (passeds.length === 0) {
    passeds = [{ pass: true, position: 0, value: 1, percentageQuota: 25 }];
  }

  //pegar a maior probabilidade

  //se tiver mais que uma

  //pegar o menor item

  const maxValue = passeds.reduce(function (prev, current) {
    return Number(prev?.percentageQuota) > Number(current?.percentageQuota)
      ? prev
      : current;
  });

  return maxValue;

  // if(pass){

  // }else{
  //   const notPasseds = aleatorio.filter((i) => {return !i?.pass && (Number(i?.value) < roullete.price_roullete) })

  //   //filtrar por
  //   const index = (Math.floor((Math.random() * notPasseds.length)) + 1)
  //   const notPassed = notPasseds[index - 1]

  //   return notPassed
  // }
};

export { radomResult };
