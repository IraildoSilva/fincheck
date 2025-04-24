import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { authMiddleware } from '@/lib/auth-middleware'
import prisma from '@/lib/db'
import {
  filtersSchema,
  transactionIdSchema,
  transactionSchema,
} from '../schemas'

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
        toBankAccount: {
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

    if (bankAccountId) {
      const data = await prisma.transaction.findMany({
        where: {
          userId,
          toBankAccountId: bankAccountId,
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
          toBankAccount: {
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

      transactions.push(...data)
    }

    return c.json({ data: transactions })
  })
  .post(
    '/',
    zValidator('json', transactionSchema),
    authMiddleware,
    async (c) => {
      const userId = c.get('userId')
      const {
        bankAccountId,
        toBankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      } = c.req.valid('json')

      if (toBankAccountId === bankAccountId) {
        return c.json(
          {
            error: 'InvalidOperation',
            message: 'Transfers to the same account are not allowed.',
          },
          400
        )
      }

      const transaction = await prisma.transaction.create({
        data: {
          userId,
          bankAccountId,
          toBankAccountId: toBankAccountId || null,
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
  .put(
    '/:transactionId',
    zValidator('param', transactionIdSchema),
    zValidator('json', transactionSchema),
    authMiddleware,
    async (c) => {
      const { transactionId } = c.req.valid('param')
      const { bankAccountId, categoryId, name, date, type, value } =
        c.req.valid('json')
      const userId = c.get('userId')

      const transaction = await prisma.transaction.update({
        where: { userId, id: transactionId },
        data: {
          bankAccountId,
          categoryId,
          date,
          name,
          type,
          value,
        },
      })

      return c.json({ data: transaction })
    }
  )
  .delete(
    '/:transactionId',
    zValidator('param', transactionIdSchema),
    authMiddleware,
    async (c) => {
      const { transactionId } = c.req.valid('param')
      const userId = c.get('userId')

      await prisma.transaction.delete({
        where: { userId, id: transactionId },
      })

      return c.json({ success: true })
    }
  )

export default app
