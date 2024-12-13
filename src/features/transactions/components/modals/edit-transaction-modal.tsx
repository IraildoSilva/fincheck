import { InputCurrency } from '@/components/input-currency'
import { ResponsiveModal } from '@/components/responsive-modal'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Transaction } from '@/entities/Transactions'
import { useGetBankAccounts } from '@/features/bank-accounts/api/use-get-bank-accounts'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDeleteTransaction } from '../../api/use-delete-transaction'
import { useMemo, useState } from 'react'
import { ConfirmDeleteModal } from '@/components/confirm-delete-modal'
import { useUpdateTransaction } from '../../api/use-update-transaction'
import { currencyStringToNumber } from '@/lib/currency-string-to-number'

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Informe o valor'),
    z.number().min(1, 'Informe o valor'),
  ]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe uma categoria'),
  bankAccountId: z.string().min(1, 'Informe uma conta'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

interface EditTransactionModalProps {
  transaction: Transaction | null
  open: boolean
  onClose: () => void
}

export function EditTransactionModal({
  onClose,
  open,
  transaction,
}: EditTransactionModalProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId ?? '',
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { accounts } = useGetBankAccounts()
  const { data: categoriesList } = useGetCategories()
  const { mutateAsync: deleteTransaction, isPending: isLoadingDelete } =
    useDeleteTransaction()
  const { mutateAsync: updateTransaction, isPending } = useUpdateTransaction()

  async function handleDeleteTransaction() {
    await deleteTransaction({ param: { transactionId: transaction!.id } })

    onClose()
  }

  async function onSubmit(data: FormData) {
    await updateTransaction({
      param: { transactionId: transaction!.id },
      json: {
        ...data,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      },
    })

    onClose()
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  const categories = useMemo(() => {
    return categoriesList?.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  const isExpense = transaction?.type === 'EXPENSE'

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        title={`Tem certeza que deseja excluir essa ${
          isExpense ? 'despesa' : ' receita'
        }?`}
      />
    )
  }

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onClose}
      dialogClassName="max-w-[340px]"
    >
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold self-center">
            {isExpense ? 'Editar Despesa' : 'Editar Receita'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <span className="text-muted-foreground text-xs">
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
                          disabled={isPending}
                          {...field}
                          type="text"
                          // className="text-sm"
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
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                isExpense ? (
                                  <span className="text-muted-foreground text-base md:text-sm">
                                    Pagar com
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground text-base md:text-sm">
                                    Receber na conta
                                  </span>
                                )
                              }
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {accounts?.map((account) => (
                            <SelectItem
                              key={account.id}
                              value={account.id}
                              className="text-base md:text-sm"
                            >
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
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                <span className="text-muted-foreground text-base md:text-sm">
                                  Categoria
                                </span>
                              }
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                              className="text-base md:text-sm"
                            >
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
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild disabled={isPending}>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal text-base md:text-sm',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span className="text-base md:text-sm">
                                  Pick a date
                                </span>
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
                className="mt-6 w-full text-base md:text-sm"
                disabled={isPending}
              >
                {isPending && <Loader2 className="size-4 animate-spin" />}
                {!isPending && 'Salvar'}
              </Button>

              <Button
                variant={'secondary'}
                type="button"
                className="mt-2 w-full text-base md:text-sm"
                onClick={handleOpenDeleteModal}
                disabled={isPending}
              >
                Deletar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
