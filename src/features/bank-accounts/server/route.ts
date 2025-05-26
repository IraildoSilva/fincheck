import { Hono } from 'hono'
import prisma from '@/lib/db'
import { authMiddleware } from '@/lib/auth-middleware'
import { zValidator } from '@hono/zod-validator'
import { bankAccountDto, bankAccountIdSchema } from '../schemas'
import { Decimal } from '@prisma/client/runtime/library'

const app = new Hono()
  .get('/', authMiddleware, async (c) => {
    const userId = c.get('userId')

    const bankAccounts = await prisma.bankAccount.findMany({
      where: { userId },
      include: {
        transactionsFrom: {
          select: {
            value: true,
            type: true,
          },
        },
        transactionsTo: {
          select: {
            value: true,
            type: true,
          },
        },
      },
    })

    const accountsWithCurrentBalance = bankAccounts.map(
      ({ transactionsFrom, transactionsTo, ...bankAccount }) => {
        // const totalFrom = transactionsFrom.reduce((acc, tx) => {
        //   if (tx.type === 'INCOME') return acc + tx.value
        //   if (tx.type === 'EXPENSE') return acc - tx.value
        //   if (tx.type === 'TRANSFER') return acc - tx.value // Transferência saindo da conta
        //   return acc
        // }, 0)

        // const totalTo = transactionsTo.reduce((acc, tx) => {
        //   if (tx.type === 'TRANSFER') return acc + tx.value // Transferência entrando na conta
        //   return acc
        // }, 0)

        // const currentBalance = bankAccount.initialBalance + totalFrom + totalTo

        const totalFrom = transactionsFrom.reduce((acc, tx) => {
          if (tx.type === 'INCOME') return acc.plus(tx.value)
          if (tx.type === 'EXPENSE') return acc.minus(tx.value)
          if (tx.type === 'TRANSFER') return acc.minus(tx.value)
          return acc
        }, new Decimal(0))

        const totalTo = transactionsTo.reduce((acc, tx) => {
          if (tx.type === 'TRANSFER') return acc.plus(tx.value)
          return acc
        }, new Decimal(0))

        const currentBalance = bankAccount.initialBalance
          .plus(totalFrom)
          .plus(totalTo)

        return {
          ...bankAccount,
          initialBalance: Number(bankAccount.initialBalance),
          currentBalance: Number(currentBalance),
        }
      }
    )

    return c.json({ data: accountsWithCurrentBalance })
  })
  .post('/', zValidator('json', bankAccountDto), authMiddleware, async (c) => {
    const { color, initialBalance, name, type } = c.req.valid('json')
    const userId = c.get('userId')

    const bankAccount = await prisma.bankAccount.create({
      data: {
        color,
        initialBalance,
        name,
        type,
        userId,
      },
    })

    return c.json({ data: bankAccount })
  })
  .put(
    '/:bankAccountId',
    zValidator('param', bankAccountIdSchema),
    zValidator('json', bankAccountDto),
    authMiddleware,
    async (c) => {
      const { bankAccountId } = c.req.valid('param')
      const { color, name, type } = c.req.valid('json')
      const userId = c.get('userId')

      const bankAccount = await prisma.bankAccount.update({
        where: { userId, id: bankAccountId },
        data: {
          color,
          name,
          type,
        },
      })

      return c.json({ data: bankAccount })
    }
  )
  .delete(
    '/:bankAccountId',
    zValidator('param', bankAccountIdSchema),
    authMiddleware,
    async (c) => {
      const { bankAccountId } = c.req.valid('param')
      const userId = c.get('userId')

      await prisma.bankAccount.delete({
        where: { userId, id: bankAccountId },
      })

      return c.json({ success: true })
    }
  )

export default app
