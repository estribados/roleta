import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function userSolicitation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await prisma.user.findMany({
    include: {
      solicitations: {
        where: {
          status: {
            equals: "SOLICITADO",
          },
        },

        orderBy: {
          status: "asc",
        },
      },
    },
  });

  let initialValue = 0;
  const total = users.reduce(function (acumulador, user) {
    const c = Number(user.house_profit) - Number(user.user_profit);
    const sum = acumulador + c;

    return sum;
  }, initialValue);

  const newTotal = total;

  return res.status(201).json({ users, house_profit: newTotal.toFixed(2) });
}
