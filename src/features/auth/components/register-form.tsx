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

import { frontendRegisterSchema } from '../schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRegister } from '../api/use-register'

type FormData = z.infer<typeof frontendRegisterSchema>

export function RegisterForm() {
  const { mutate, isPending } = useRegister()

  const form = useForm<FormData>({
    resolver: zodResolver(frontendRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: FormData) {
    mutate({ json: values })
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Crie sua conta</CardTitle>
        <CardDescription>
          Ao criar sua conta, você concorda com nossa{' '}
          <Link
            href={'#'}
            className="underline text-secondary-foreground hover:opacity-80 transition"
          >
            Politica de Privacidade
          </Link>{' '}
          e{' '}
          <Link
            href={'#'}
            className="underline text-secondary-foreground hover:opacity-80 transition"
          >
            Termos de serviço
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome"
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
                Criar conta
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Já possui uma conta?{' '}
              <Link
                href="/login"
                className="underline hover:opacity-80 transition-all"
              >
                Fazer Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
