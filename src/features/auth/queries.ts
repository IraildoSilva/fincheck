import { User } from '@/entities/User'
import { cookies } from 'next/headers'
import { AUTH_COOKIE } from './constants'
import { JwtPayload, verify } from 'jsonwebtoken'
import { env } from '@/lib/config'
import prisma from '@/lib/db'

function getAccessToken() {
  return cookies().get(AUTH_COOKIE)?.value
}

function verifyJwt(): null | string {
  const accessToken = getAccessToken()

  if (!accessToken) return null

  try {
    const { sub: userId } = verify(accessToken, env.JWT_SECRET) as JwtPayload

    if (!userId) return null

    return userId
  } catch {
    return null
  }
}

export async function auth(): Promise<null | User> {
  const userId = verifyJwt()

  if (!userId) return null

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    })

    if (!user) return null

    return user
  } catch (error) {
    console.error('Erro no Prisma:', error)
    return null
  }
}
