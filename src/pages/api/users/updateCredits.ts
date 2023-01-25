import { hash } from "bcryptjs";
import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateCredits(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, resultQuotas, price_roullete } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  // console.log({
  //   credits: Number(user?.credits),
  //   resultQuotas,
  //   price_roullete,
  //   // descontValue,
  //   // house_profit,
  // });

  if (user) {
    const descontValue = resultQuotas - price_roullete;
    const lucroroleta = (price_roullete - resultQuotas) / 2;
    const house_profit = resultQuotas - Number(user.house_profit);
    const house_profit2 = Number(user.house_profit) - resultQuotas;

    if (price_roullete > resultQuotas) {
      console.log("casa ganhando");
      // console.log({
      //   house_profit2,
      //   resultQuotas,
      //   userprofit: Number(user.house_profit),
      // });

      //se eu estou ganhando menu bonus

      const updatedUser = await prisma.user.update({
        data: {
          credits: Number(user?.credits) + descontValue,
          house_profit: Number(user.house_profit) + resultQuotas,
          bonus:
            Number(user.house_profit) >= 0
              ? house_profit2 < 0
                ? Number(user.bonus) + lucroroleta
                : 0
              : 0,
          profit:
            Number(user.house_profit) >= 0
              ? house_profit2 < 0
                ? Number(user.profit) + lucroroleta
                : 0
              : 0,
        },
        where: {
          id: userId,
        },
      });

      return res.status(201).json(updatedUser);
    } else if (price_roullete < resultQuotas) {
      console.log("casa perdendo");
      const updatedUser = await prisma.user.update({
        data: {
          credits: Number(user?.credits) + descontValue,
          house_profit: house_profit2,
          bonus: house_profit2 > 0 ? Number(user.bonus) + lucroroleta : 0,
          profit: house_profit2 > 0 ? Number(user.profit) + lucroroleta : 0,
        },
        where: {
          id: userId,
        },
      });

      return res.status(201).json(updatedUser);
    }
  }

  return res.status(201).json(user);
}

//82,75
