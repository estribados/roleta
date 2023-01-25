import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function findOrCreate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { house_profit, userId } = req.body;

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
        house_profit: Number(user.house_profit) - house_profit,
        credits: Number(user.credits) + house_profit,
        bonus: Number(user.bonus) - house_profit,
      },
    });

    return res.status(201).json(updatedUser);
  }
}
