import { z } from 'zod'

export const bankAccountDto = z.object({
  name: z.string(),
  inititalBalance: z.number(),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string(),
})
