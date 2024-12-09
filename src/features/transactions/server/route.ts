import { authMiddleware } from '@/lib/auth-middleware'
import prisma from '@/lib/db'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { filtersSchema } from '../schemas'

const app = new Hono().get(
  '/',
  zValidator('param', filtersSchema),
  authMiddleware,
  async (c) => {
    const userId = c.get('userId')
    const { month, year, bankAccountId, type } = c.req.valid('param')

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        bankAccountId,
        type,
        date: {
          gte: new Date(Date.UTC(Number(year), Number(month))),
          lt: new Date(Date.UTC(Number(year), Number(month) + 1)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    })

    return c.json({ data: transactions })
  }
)

export default app
