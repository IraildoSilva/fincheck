import { authMiddleware } from '@/lib/auth-middleware'
import prisma from '@/lib/db'
import { Hono } from 'hono'

const app = new Hono().get('/', authMiddleware, async (c) => {
  const userId = c.get('userId')

  const transactions = await prisma.transaction.findMany({
    where: { userId },
  })

  return c.json({ data: transactions })
})

export default app
