import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { authMiddleware } from '@/lib/auth-middleware'
import prisma from '@/lib/db'
import { filtersSchema, transactionSchema } from '../schemas'

const app = new Hono()
  .get('/', zValidator('query', filtersSchema), authMiddleware, async (c) => {
    const userId = c.get('userId')
    const { month, year, bankAccountId, type } = c.req.valid('query')

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
        bankAccount: {
          select: {
            name: true,
            color: true,
          },
        },
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
  })
  .post(
    '/',
    zValidator('json', transactionSchema),
    authMiddleware,
    async (c) => {
      const userId = c.get('userId')
      const { bankAccountId, categoryId, date, name, type, value } =
        c.req.valid('json')

      const transaction = await prisma.transaction.create({
        data: {
          userId,
          bankAccountId,
          categoryId,
          name,
          value,
          date,
          type,
        },
      })

      return c.json({ data: transaction })
    }
  )

export default app
