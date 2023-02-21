import { IQuotas } from "./../interfaces/types";
export const getResultRollete = (quotas: IQuotas[]) => {
  const probability = Math.floor(Math.random() * 101);

  //se minha probabilidade for maior ou igual a probabilidade  da cota ela vai sair

  const indexQuota = quotas.findIndex((quota) => quota.percentQuota);

  if (probability <= Number(quotas[indexQuota].percentQuota || 0)) {
    return indexQuota;
  } else {
    const resultIndex = Math.floor(Math.random() * quotas.length);

    if (resultIndex === 0) {
      return 1;
    }

    return resultIndex;
  }

  // se não pego meu arrray.length e escolho um numero aleatorio nele
};
