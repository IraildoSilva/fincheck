import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { zValidator } from '@hono/zod-validator'
import { apiLoginSchema, apiRegisterSchema } from '../schemas'
import prisma from '@/lib/db'
import { compare, hash } from 'bcryptjs'
import { env } from '@/lib/config'
import { setCookie } from 'hono/cookie'
import { AUTH_COOKIE } from '../constants'

const app = new Hono()
  .post('/login', zValidator('json', apiLoginSchema), async (c) => {
    const { email, password } = c.req.valid('json')

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return c.json(
        { error: 'Unauthorized', message: 'Invalid credentials' },
        401
      )
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return c.json(
        { error: 'Unauthorized', message: 'Invalid credentials' },
        401
      )
    }

    const accessToken = await sign({ sub: user.id }, env.JWT_SECRET, 'HS256')

    setCookie(c, AUTH_COOKIE, accessToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, //7d
    })

    return c.json({ success: true })
  })
  .post('/register', zValidator('json', apiRegisterSchema), async (c) => {
    const { email, name, password } = c.req.valid('json')

    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (emailAlreadyExists) {
      return c.json(
        { error: 'Conflict', message: 'This email is already in use' },
        409
      )
    }

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    })

    const accessToken = await sign({ sub: user.id }, env.JWT_SECRET, 'HS256')

    setCookie(c, AUTH_COOKIE, accessToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, //7d
    })

    return c.json({ success: true })
  })

export default app
