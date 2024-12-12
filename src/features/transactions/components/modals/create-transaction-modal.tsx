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
import { Select } from '@/components/ui/select'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { useDashboard } from '@/hooks/use-dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { useGetBankAccounts } from '@/features/bank-accounts/api/use-get-bank-accounts'
import { useCreateTransaction } from '../../api/use-create-transaction'
import { currencyStringToNumber } from '@/lib/currency-string-to-number'

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string({ message: 'Informe o nome' }).min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe uma categoria'),
  bankAccountId: z.string().min(1, 'Informe uma conta'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export function CreateTransactionModal() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useDashboard()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: '',
      categoryId: '',
      value: '0',
      date: new Date(),
    },
  })

  const { accounts } = useGetBankAccounts()
  const { data: categoriesList } = useGetCategories()
  const { mutateAsync, isPending } = useCreateTransaction()

  async function onSubmit(data: FormData) {
    await mutateAsync({
      json: {
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      },
    })

    closeNewTransactionModal()
    form.reset()
  }

  const categories = useMemo(() => {
    return categoriesList?.filter(
      (category) => category.type === newTransactionType
    )
  }, [categoriesList, newTransactionType])

  const isExpense = newTransactionType === 'EXPENSE'

  return (
    <ResponsiveModal
      open={isNewTransactionModalOpen}
      onOpenChange={closeNewTransactionModal}
      dialogClassName="max-w-[340px]"
    >
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold self-center">
            {isExpense ? 'Nova Despesa' : 'Nova Receita'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <span className="text-muted-foreground text-xs text-center]">
                  Valor da {isExpense ? 'despesa' : 'receita'}
                </span>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-muted-foreground tracking-[-0.5px] text-lg">
                    R$
                  </span>

                  <FormField
                    control={form.control}
                    name="value"
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
                          placeholder={
                            isExpense ? 'Nome da Despesa' : 'Nome da Receita'
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankAccountId"
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
                                isExpense ? 'Pagar com' : 'Receber na conta'
                              }
                              className="text-muted-foreground"
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {accounts?.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={'Categoria'}
                              className="text-muted-foreground"
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="mt-6 w-full"
                disabled={isPending}
              >
                {isPending && <Loader2 className="size-4 animate-spin" />}
                {!isPending && 'Salvar'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
