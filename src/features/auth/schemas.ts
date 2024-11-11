import { z } from 'zod'

export const frontendLoginSchema = z.object({
  email: z.string().email('Informe um email válido'),
  password: z.string().min(1, 'Digite sua senha'),
})

export const frontendRegisterSchema = z.object({
  name: z.string({ message: 'Nome é obrigatório' }).min(1, "Nome é obrigatório"),
  email: z.string().email('Informe um email válido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 dígitos'),
})
