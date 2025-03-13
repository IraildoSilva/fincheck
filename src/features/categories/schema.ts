import { TransactionType } from '@prisma/client'
import { z } from 'zod'

export const categoryDto = z.object({
  name: z.string({ message: 'Name is required' }).min(1, 'Name is required'),
  type: z.nativeEnum(TransactionType, { message: 'Invalid Type' }),
})

export const categoryIdSchema = z.object({
  categoryId: z.string().uuid(),
})
