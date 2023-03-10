import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";
import { Decimal } from "@prisma/client/runtime";

export default async function roundBonus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { house_profit, win } = req.body;

  const roulletes = await prisma.roulletes.findMany({
    where: {
      status: "ATIVA",
      AND: {
        quotas: {
          some: {
            percentQuota: {
              not: null,
            },
          },
        },
      },
    },
    include: {
      quotas: {
        where: {
          AND: {
            NOT: {
              percentQuota: null,
            },
          },
        },
      },
    },
  });

  const fortyPercentage: any = win ? 0 : house_profit * 0.4;

  roulletes.map(async (roullete) => {
    const newValue =
      fortyPercentage * (Number(roullete.percentageRoullete) / 100);

    const updatedRoullete = await prisma.quotas.update({
      where: {
        id: roullete.quotas[0].id,
      },
      data: {
        valueQuota: newValue,
      },
    });

    return updatedRoullete;
  });

  return res.status(201).json(roulletes);
}
