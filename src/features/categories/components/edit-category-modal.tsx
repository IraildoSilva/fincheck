import { ConfirmDeleteModal } from '@/components/confirm-delete-modal'
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
import { Category, TransactionType } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDeleteCategory } from '../api/use-delete-category'
import { useUpdateCategory } from '../api/use-update-category'

interface UpdateCategoryModalProps {
  open: boolean
  onClose: () => void
  categoryBeingEdited: Category
}

const schema = z.object({
  name: z.string({ message: 'Informe o nome' }).min(1, 'Informe o nome'),
  type: z.nativeEnum(TransactionType, {
    message: 'Informe o tipo da categoria',
  }),
})

type FormData = z.infer<typeof schema>

export function EditCategoryModal({
  open,
  onClose,
  categoryBeingEdited,
}: UpdateCategoryModalProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const form = useForm<FormData>({
    defaultValues: {
      name: categoryBeingEdited.name,
      type: categoryBeingEdited.type,
    },
    resolver: zodResolver(schema),
  })

  const { mutateAsync: updateCategory, isPending } = useUpdateCategory()
  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory()

  async function onSubmit(data: FormData) {
    await updateCategory({
      param: { categoryId: categoryBeingEdited.id },
      json: { ...data },
    })

    onClose()
  }

  async function handleDeleteCategory() {
    await deleteCategory({ param: { categoryId: categoryBeingEdited.id } })

    onClose()
  }

  function handleDeleteModalOpen() {
    setIsDeleteModalOpen((prevState) => !prevState)
  }

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isDeleting}
        onClose={handleDeleteModalOpen}
        onConfirm={handleDeleteCategory}
        title="Tem certeza que deseja excluir essa categoria?"
        description="Ao excluir a categoria, todas as transações relacionadas serão modificadas"
      />
    )
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
            Editar Categoria
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
                          <SelectItem value={'EXPENSE'}>Despesa </SelectItem>
                        </SelectContent>
                      </Select>
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
                onClick={handleDeleteModalOpen}
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
