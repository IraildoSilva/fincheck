/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import auth from '@/features/auth/server/route'
import bankAccount from '@/features/bank-accounts/server/route'
import transaction from '@/features/transactions/server/route'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

const routes = app
  .route('/auth', auth)
  .route('/bank-accounts', bankAccount)
  .route('/transactions', transaction)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export type AppType = typeof routes
