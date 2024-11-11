import { z } from 'zod'

export const frontendLoginSchema = z.object({
  email: z.string().email('Informe um email válido'),
  password: z.string().min(1, 'Digite sua senha'),
})
