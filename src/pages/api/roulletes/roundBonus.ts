import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";
import { Decimal } from "@prisma/client/runtime";

export default async function roundBonus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { house_profit, win } = req.body;

  // pegar todas minhas roletas ativas,

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

  //40% do premio maximo dividio pela quantidade de roletas
  const newValueQuota: any = (win ? 0 : house_profit * 0.4) / roulletes.length;

  // vou pegar de cada roleta a cota que tiver a porcentagem

  const updatedRoulletes = roulletes.map(async (roullete) => {
    await prisma.quotas.update({
      where: {
        id: roullete.quotas[0].id,
      },
      data: {
        valueQuota: newValueQuota,
      },
    });
  });

  return res.status(201).json(roulletes);
}
