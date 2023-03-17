import { IQuotas } from "./../interfaces/types";
export const getResultRollete = (quotas: IQuotas[]) => {
  const probability = Number((Math.random() * 99.9 + 0.1).toFixed(2));

  const filterQuotas = quotas.filter((quota) => {
    return quota.percentQuota && probability <= (quota.percentQuota || 0);
  });

  // console.log({
  //   probability,
  //   filterQuotas,
  // });

  //se tiver dois vencedores pegue sortei um e retorne o index
  if (filterQuotas.length === 2) {
    const resultIndex = Math.floor(Math.random() * filterQuotas.length);
    // console.log("primeiro if");

    return resultIndex;
  }

  //se tiver vencedor procuro o index e retorno
  if (!!filterQuotas.length) {
    const indexQuotaWin = quotas.findIndex(
      (quota) => quota.percentQuota === filterQuotas[0].percentQuota
    );

    // console.log("segundo if");

    return indexQuotaWin;
  }

  //se ninguem ganhar embaralhe todos e retorno um index que seja diferente de 1 e 0
  const resultIndexLoses = Math.floor(Math.random() * quotas.length);

  if (resultIndexLoses === 1 || resultIndexLoses === 0) {
    // console.log("teceiro if", resultIndexLoses);

    return 2;
  }

  // console.log("quarto if", resultIndexLoses);

  return resultIndexLoses;
};
