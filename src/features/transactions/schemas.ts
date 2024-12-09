import { z } from 'zod'

export const filtersSchema = z.object({
  month: z.string(),
  year: z.string(),
  bankAccountId: z.string().uuid().optional(),
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
})

export type TransactionsFilters = z.infer<typeof filtersSchema>
