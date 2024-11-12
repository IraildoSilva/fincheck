import { z } from 'zod'

export const frontendLoginSchema = z.object({
  email: z.string().email('Informe um email válido'),
  password: z.string().min(1, 'Digite sua senha'),
})

export const frontendRegisterSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório'),
  email: z.string().email('Informe um email válido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 dígitos'),
})

export const apiLoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Invalid password'),
})

export const apiRegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must have at least 8 characters.'),
})
