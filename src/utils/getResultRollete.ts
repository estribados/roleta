import { IQuotas } from "./../interfaces/types";
export const getResultRollete = (quotas: IQuotas[]) => {
  const probability = Number((Math.random() * 99.9 + 0.1).toFixed(2));

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
};
