import { authMiddleware } from '@/lib/auth-middleware'
import prisma from '@/lib/db'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { categoryIdSchema, categoryDto } from '../schema'

const app = new Hono()
  .get('/', authMiddleware, async (c) => {
    const userId = c.get('userId')

    const categories = await prisma.category.findMany({
      where: { userId },
    })

    return c.json({ data: categories })
  })
  .post('/', zValidator('json', categoryDto), authMiddleware, async (c) => {
    const { name, type } = c.req.valid('json')
    const userId = c.get('userId')

    const createdCategory = await prisma.category.create({
      data: {
        userId,
        name,
        type,
        icon: 'default',
      },
    })

    return c.json({ data: createdCategory })
  })
  .put(
    '/:categoryId',
    zValidator('param', categoryIdSchema),
    zValidator('json', categoryDto),
    authMiddleware,
    async (c) => {
      const { categoryId } = c.req.valid('param')
      const { name, type } = c.req.valid('json')
      const userId = c.get('userId')

      const updatedCategory = await prisma.category.update({
        where: { userId, id: categoryId },
        data: {
          name,
          type,
        },
      })

      return c.json({ data: updatedCategory })
    }
  )
  .delete(
    '/:categoryId',
    zValidator('param', categoryIdSchema),
    authMiddleware,
    async (c) => {
      const { categoryId } = c.req.valid('param')
      const userId = c.get('userId')

      await prisma.category.delete({
        where: { userId, id: categoryId },
      })

      return c.json({ success: true })
    }
  )

export default app
