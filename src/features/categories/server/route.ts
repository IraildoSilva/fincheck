import { authMiddleware } from '@/lib/auth-middleware'
import prisma from '@/lib/db'
import { Hono } from 'hono'

const app = new Hono().get('/', authMiddleware, async (c) => {
  const userId = c.get('userId')

  const categories = await prisma.category.findMany({
    where: { userId },
  })

  return c.json({ data: categories })
})

export default app
