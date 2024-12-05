'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { frontendLoginSchema } from '../schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useLogin } from '../api/use-login'
import { Loader2 } from 'lucide-react'

type FormData = z.infer<typeof frontendLoginSchema>

export function LoginForm() {
  const { mutate, isPending } = useLogin()

  const form = useForm<FormData>({
    resolver: zodResolver(frontendLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: FormData) {
    mutate({ json: values })
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Bem vindo de volta!</CardTitle>
        <CardDescription>
          Digite o seu email abaixo para entrar na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="exemplo@email.com"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending && 'Entrar'}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Novo por aqui?{' '}
              <Link
                href="/register"
                className="underline hover:opacity-80 transition-all"
              >
                Cadastre-se
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
