import { z } from 'zod'

export const filtersSchema = z.object({
  month: z.string(),
  year: z.string(),
  bankAccountId: z.string().uuid().optional(),
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
})

export const transactionSchema = z.object({
  bankAccountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  name: z.string(),
  value: z.number().positive(),
  date: z.string(),
  type: z.enum(['INCOME', 'EXPENSE']),
})

export const transactionIdSchema = z.object({
  transactionId: z.string().uuid(),
})
