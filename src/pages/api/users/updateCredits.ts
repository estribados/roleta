import { hash } from "bcryptjs";
import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateCredits(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, resultQuotas, price_roullete, roulleteBonus } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (user) {
    const resultadoRodada = resultQuotas - price_roullete;
    const resultadoRodada2 = price_roullete - resultQuotas;

    // console.log({
    //   resultadoRodada,
    //   resultadoRodada2,
    //   credits: Number(user?.credits) + resultadoRodada,
    //   accumulated: (Number(user.accumulated) - resultadoRodada).toFixed(3),
    //   bonus: (
    //     (Number(user.accumulated?.toFixed(3)) - resultadoRodada) /
    //     2
    //   ).toFixed(3),
    //   house_profit: (
    //     Number(user.house_profit?.toFixed(3)) + resultadoRodada2
    //   ).toFixed(3),
    //   user_profit: (
    //     Number(user.user_profit?.toFixed(3)) + resultadoRodada
    //   ).toFixed(3),
    // });

    if (roulleteBonus) {
      const updatedUser = await prisma.user.update({
        data: {
          credits: Number(user?.credits) + resultadoRodada,
          accumulated: 0,
          bonus: 0,
          house_profit:
            Number(user.house_profit?.toFixed(3)) + resultadoRodada2,
          ...(resultadoRodada2 < 0 && {
            user_profit: Number(user.user_profit?.toFixed(3)) + resultadoRodada,
          }),
        },
        where: {
          id: userId,
        },
      });

      return res.status(201).json(updatedUser);
    }

    const updatedUser = await prisma.user.update({
      data: {
        credits: Number(user?.credits) + resultadoRodada,
        accumulated: Number(user.accumulated) - resultadoRodada,
        bonus: (Number(user.accumulated?.toFixed(3)) - resultadoRodada) / 2,
        house_profit: Number(user.house_profit?.toFixed(3)) + resultadoRodada2,
        ...(resultadoRodada2 < 0 && {
          user_profit: Number(user.user_profit?.toFixed(3)) + resultadoRodada,
        }),
      },
      where: {
        id: userId,
      },
    });

    return res.status(201).json(updatedUser);
  }
}
