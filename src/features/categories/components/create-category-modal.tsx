import { ResponsiveModal } from '@/components/responsive-modal'
import { Button } from '@/components/ui/button'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionType } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateCategory } from '../api/use-create-category'

interface CreateCategoryModalProps {
  open: boolean
  onClose: () => void
}

const schema = z.object({
  name: z.string({ message: 'Informe o nome' }).min(1, 'Informe o nome'),
  type: z.nativeEnum(TransactionType, {
    message: 'Informe o tipo da categoria',
  }),
})

type FormData = z.infer<typeof schema>

export function CreateCategoryModal({
  open,
  onClose,
}: CreateCategoryModalProps) {
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      type: '' as 'INCOME',
    },
    resolver: zodResolver(schema),
  })

  const { mutateAsync: createCategory, isPending } = useCreateCategory()

  async function onSubmit(data: FormData) {
    await createCategory({ json: { ...data } })

    onClose()
  }

  return (
    <ResponsiveModal
      onOpenChange={onClose}
      open={open}
      dialogClassName="max-w-[340px]"
    >
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold self-center">
            Nova Categoria
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          placeholder={'Nome da categoria'}
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
                            <SelectValue placeholder={'Tipo da categoria'} />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value={'INCOME'}>Receita</SelectItem>
                          <SelectItem value={'EXPENSE'}>Despesa</SelectItem>
                          <SelectItem value={'TRANSFER'}>
                            Transferência
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
