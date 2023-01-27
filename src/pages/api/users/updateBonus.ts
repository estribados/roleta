import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function findOrCreate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { result, userId } = req.body;

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
        accumulated: Number(user.accumulated) - result,
        credits: Number(user.credits) + result,
        bonus: Number(user.bonus) - result,
        house_profit: Number(user.house_profit) + Number(user.profit),
        profit: Number(user.bonus) - result,
      },
    });

    return res.status(201).json(updatedUser);
  }
}
