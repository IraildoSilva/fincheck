'use client'

import { InputCurrency } from '@/components/input-currency'
import { ResponsiveModal } from '@/components/responsive-modal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDashboard } from '@/hooks/use-dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ColorsDropdownInput } from '../colors-dropdown'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useCreateBankAccount } from '../../api/use-create-bank-account'
import { currencyStringToNumber } from '@/lib/currency-string-to-number'

const schema = z.object({
  initialBalance: z
    .string({ required_error: 'Saldo inicial é obrigatório' })
    .min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {
    message: 'Tipo da conta é obrigatório',
  }),
  color: z.string().min(1, 'Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function CreateBankAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: '',
      name: '',
      initialBalance: '0',
      type: '' as 'CHECKING',
    },
  })

  const { mutateAsync, isPending } = useCreateBankAccount()

  async function onSubmit(data: FormData) {
    await mutateAsync({
      json: {
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      },
    })

    closeNewAccountModal()
    form.reset()
  }

  return (
    <ResponsiveModal
      open={isNewAccountModalOpen}
      onOpenChange={closeNewAccountModal}
      dialogClassName="w-[340px]"
    >
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold self-center">
            Nova Conta
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <span className="text-muted-foreground text-xs">
                  Saldo inicial
                </span>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-muted-foreground tracking-[-0.5px] text-lg">
                    R$
                  </span>

                  <FormField
                    control={form.control}
                    name="initialBalance"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <InputCurrency onChange={onChange} value={value} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder={'Nome da conta'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                <span className="text-muted-foreground">
                                  Tipo de conta
                                </span>
                              }
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem key={'CHECKING'} value={'CHECKING'}>
                            Conta Corrente
                          </SelectItem>
                          <SelectItem key={'INVESTMENT'} value={'INVESTMENT'}>
                            Investimentos
                          </SelectItem>
                          <SelectItem key={'CASH'} value={'CASH'}>
                            Dinheiro Físico
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ColorsDropdownInput
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="mt-6 w-full text-base md:text-sm"
                disabled={isPending}
              >
                {isPending && <Loader2 className="size-4 animate-spin" />}
                {!isPending && 'Criar'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
