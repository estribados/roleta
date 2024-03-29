import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, itens, roullete } = req.body;

  const rol = await prisma.roulletes.update({
    data: {
      nameCategory: roullete.nameCategory,
      price_roullete: roullete.valueCategory,
      percentageRoullete: roullete.percentageRoullete,
    },
    where: {
      id,
    },
  });

  itens.map(async (item: any) => {
    await prisma.quotas.upsert({
      where: {
        id: item.id ?? "123",
      },
      update: {
        color: item.color,
        valueQuota: item.valueQuota,
        percentQuota: item.percentQuota,
      },
      create: {
        color: item.color,
        valueQuota: item.valueQuota,
        percentQuota: item.percenteQuota,
        roulleteId: rol.id,
      },
    });
  });

  return res.status(201).json({});
}
