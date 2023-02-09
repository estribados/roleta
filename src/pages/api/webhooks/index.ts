// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import apiMp from "services/apiMp";
export default async function webhooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    data: { id },
  } = req.body;

  try {
    const response = await apiMp.get(
      `v1/payments/${id}?access_token=${process.env.ACCESS_TOKEN_MP}`
    );

    const {
      status,
      transaction_details,
      additional_info: { items: userId },
    } = response.data;
    const user = await prisma.user.findFirst({
      where: {
        id: userId[0].id,
      },
    });

    if (user) {
      if (status === "approved") {
        //atualizar usuario com creditos de transaction_amount
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            credits:
              Number(user.credits) +
              Number(transaction_details.total_paid_amount),
          },
        });

        return res.status(200).json({ status });
      } else {
        return res.status(200).json({ status });
        //mandar enviar uma notificação para o usuario
      }
    }
    return res.status(200).json({ status: "approved" });
  } catch (err) {
    console.log(err);
  }
}
