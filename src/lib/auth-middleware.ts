'server-only'

import { AUTH_COOKIE } from '@/features/auth/constants'
import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import { env } from '@/lib/config'
import prisma from './db'
import { User } from '@prisma/client'

type AdditionalContext = {
  Variables: {
    user: Omit<User, 'password'>
  }
}

export const authMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const accessToken = getCookie(c, AUTH_COOKIE)

    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const { sub: userId } = await verify(accessToken, env.JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: { id: userId as string },
      select: { email: true, id: true, name: true },
    })

    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }

    c.set('user', user)

    await next()
  }
)
