import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function findOrCreate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { credits, userId } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (user) {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        credits: Number(user.credits) + Number(credits),
      },
    });

    return res.status(201).json(updatedUser);
  }
}
