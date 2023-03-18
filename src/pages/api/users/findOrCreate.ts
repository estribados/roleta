import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function findOrCreate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(201).json(user);
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        credits: 50,
      },
    });
    return res.status(201).json(user);
  }
}
