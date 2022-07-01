import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  await prisma.$connect()

  switch (req.method) {
    case 'GET':
      const fruits = await prisma.fruit.findMany();
      res.status(200).json({ status: 'success', data: fruits })

      break;

    case 'POST':
      const fruit = await prisma.fruit.create({ data: req.body });
      res.status(200).json({ status: 'success', data: fruit })

      break;
  }
}