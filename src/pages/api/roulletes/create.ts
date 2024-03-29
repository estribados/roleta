import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nameCategory, price_roullete, quotas, percentageRoullete } = req.body;

  const roullete = await prisma.roulletes.create({
    data: {
      nameCategory,
      price_roullete: Number(price_roullete),
      percentageRoullete: Number(percentageRoullete),
    },
  });

  const newQuotas = quotas.map((quota: any) => {
    const newQuota = {
      ...quota,
      roulleteId: roullete.id,
    };

    return newQuota;
  });

  await prisma.quotas.createMany({
    data: newQuotas,
  });

  return res.status(201).json({});
}
