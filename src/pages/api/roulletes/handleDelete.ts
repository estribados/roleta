import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "lib/prisma";

export default async function deleteRoullete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  await prisma.roulletes.delete({
    where: {
      id,
    },
  });

  return res.status(201).json({});
}
