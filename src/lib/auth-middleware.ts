'server-only'

import { AUTH_COOKIE } from '@/features/auth/constants'
import { getCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import { env } from '@/lib/config'

type AdditionalContext = {
  Variables: {
    userId: string
  }
}

export const authMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const accessToken = getCookie(c, AUTH_COOKIE)

    if (!accessToken) {
      return c.json(
        { error: 'Unauthorized', message: 'Missing Access Token' },
        401
      )
    }

    const { sub: userId } = await verify(accessToken, env.JWT_SECRET)

    if (!userId) {
      return c.json(
        { error: 'Unauthorized', message: 'Invalid Access Token' },
        401
      )
    }

    c.set('userId', userId as string)

    await next()
  }
)
