import { Hono } from 'hono'
import prisma from '@/lib/db'
import { getCookie } from 'hono/cookie'
import { AUTH_COOKIE } from '@/features/auth/constants'
import { verify } from 'hono/jwt'
import { env } from '@/lib/config'
import type { JwtPayload } from 'jsonwebtoken'

const app = new Hono().get('/', async (c) => {
  const accessToken = getCookie(c, AUTH_COOKIE)

  if (!accessToken) {
    return c.json(
      { error: 'Unauthorized', message: 'Missing Access Token' },
      401
    )
  }

  const { sub: userId } = (await verify(
    accessToken,
    env.JWT_SECRET
  )) as JwtPayload

  if (!userId) {
    return c.json(
      { error: 'Unauthorized', message: 'Invalid Access Token' },
      401
    )
  }

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
