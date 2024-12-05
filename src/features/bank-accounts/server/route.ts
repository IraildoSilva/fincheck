import { Hono } from 'hono'
import prisma from '@/lib/db'
import { authMiddleware } from '@/lib/auth-middleware'

const app = new Hono().get('/', authMiddleware, async (c) => {
  const userId = c.get('userId')

  const bankAccounts = await prisma.bankAccount.findMany({
    where: { userId },
    include: {
      transactions: {
        select: {
          value: true,
          type: true,
        },
      },
    },
  })

  const accountsWithCurrentBalance = bankAccounts.map(
    ({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0
      )

      const currentBalance = bankAccount.initialBalance + totalTransactions

      return {
        ...bankAccount,
        currentBalance,
      }
    }
  )

  return c.json({ data: accountsWithCurrentBalance })
})

export default app
