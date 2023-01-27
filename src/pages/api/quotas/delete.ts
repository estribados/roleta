import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

export default async function deleteQuota(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const quota = await prisma.quotas.findFirst({
    where: {
      id: id as string,
    },
  });

  if (quota) {
    await prisma.quotas.delete({
      where: {
        id: id as string,
      },
    });
    return res.status(201).json({});
  }
}
