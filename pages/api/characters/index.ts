import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  await prisma.$connect()

  switch (req.method) {
    case 'GET':
      const characters = await prisma.character.findMany({ include: { fruit: true } });
      res.status(200).json({ status: 'success', data: characters })

      break;

    case 'POST':
      const character = await prisma.character.create({ data: req.body });
      res.status(200).json({ status: 'success', data: character })

      break;
  }
}