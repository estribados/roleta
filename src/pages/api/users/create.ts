import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../lib/prisma";
export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, last_name, email, password, bank, pix, telephone } = req.body;

  const findedUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (findedUser) {
    return res
      .status(422)
      .json("Já existe um usuário cadastrado com esse email");
  }

  const hashedPassword = await hash(password, 8);

  await prisma.user.create({
    data: {
      bank,
      name,
      last_name,
      email,
      password: hashedPassword,
      pix,
      telephone,
      credits: 100,
    },
  });

  return res.status(201).json({});
}
