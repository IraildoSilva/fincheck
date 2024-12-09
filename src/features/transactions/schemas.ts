import { z } from 'zod'

export const filtersSchema = z.object({
  month: z.number(),
  year: z.number(),
  bankAccountId: z.string().uuid().optional(),
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
})
