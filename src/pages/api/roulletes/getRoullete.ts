import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

export default async function getRoulletes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const roullete = await prisma.roulletes.findFirst({
    where: {
      id: id as string,
    },
    include: {
      quotas: {
        orderBy: [
          // {
          //   percentQuota: "desc",
          // },
          {
            createdAt: "asc",
          },
        ],
      },
    },
  });

  return res.status(201).json(roullete);
}
