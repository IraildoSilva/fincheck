import { z } from 'zod'

export const bankAccountDto = z.object({
  name: z.string(),
  initialBalance: z.number(),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string(),
})

export const bankAccountIdSchema = z.object({
  bankAccountId: z.string().uuid()
})