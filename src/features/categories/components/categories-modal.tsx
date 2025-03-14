import { ResponsiveModal } from '@/components/responsive-modal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetCategories } from '../api/use-get-categories'
import { Skeleton } from '@/components/ui/skeleton'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MouseEvent, useMemo, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { CreateCategoryModal } from './create-category-modal'
import { ConfirmDeleteModal } from '@/components/confirm-delete-modal'
import { Category } from '@prisma/client'
import { EditCategoryModal } from './edit-category-modal'
import { useDeleteCategory } from '../api/use-delete-category'

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

export function CategoriesModal({ open, onClose }: CategoriesModalProps) {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] =
    useState(false)
  const [categoryBeingEdited, setCategoryBeingEdited] =
    useState<Category | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('INCOME')
  const [categoryBeingDeleted, setCategoryBeingDeleted] =
    useState<Category | null>(null)
  const { data: categories, isFetching } = useGetCategories()

  function handleCategoryFilter(type: 'INCOME' | 'EXPENSE') {
    setCategoryFilter(type)
  }

  const filteredCategories = useMemo(() => {
    return categories?.filter((category) => category.type === categoryFilter)
  }, [categories, categoryFilter])

  function handleCreateCategoryModalOpen() {
    setIsCreateCategoryModalOpen((prevState) => !prevState)
  }

  function handleDeleteModalOpen(event: MouseEvent, category: Category) {
    event.stopPropagation()
    setIsDeleteModalOpen(true)
    setCategoryBeingDeleted(category)
  }

  function handleDeleteModalClose() {
    setIsDeleteModalOpen(false)
  }

  function handleUpdateCategory(category: Category) {
    setIsUpdateCategoryModalOpen(true)
    setCategoryBeingEdited(category)
  }

  function handleUpdateCategoryModalClose() {
    setIsUpdateCategoryModalOpen(false)
  }

  const { mutateAsync: deleteCategory, isPending } = useDeleteCategory()

  async function handleDeleteCategory() {
    if (!categoryBeingDeleted) return

    await deleteCategory({ param: { categoryId: categoryBeingDeleted.id } })

    handleDeleteModalClose()
  }

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isPending}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteCategory}
        title="Tem certeza que deseja excluir essa categoria?"
        description="Ao excluir a categoria, todas as transações relacionadas serão modificadas"
      />
    )
  }

  if (isCreateCategoryModalOpen) {
    return (
      <CreateCategoryModal
        open={isCreateCategoryModalOpen}
        onClose={handleCreateCategoryModalOpen}
      />
    )
  }

  if (categoryBeingEdited && isUpdateCategoryModalOpen) {
    return (
      <EditCategoryModal
        open={isUpdateCategoryModalOpen}
        onClose={handleUpdateCategoryModalClose}
        categoryBeingEdited={categoryBeingEdited}
      />
    )
  }

  const hasCategories = filteredCategories && !isFetching
  return (
    <>
      <ResponsiveModal
        open={open}
        onOpenChange={onClose}
        dialogClassName="max-w-[500px]"
      >
        <Card className="shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-lg font-bold self-center">
              Gerencie suas categorias
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-x-2">
                <span className="text-sm">Filtrar por: </span>
                <div className="w-28">
                  <Select
                    defaultValue={categoryFilter}
                    onValueChange={handleCategoryFilter}
                  >
                    <SelectTrigger className="focus:ring-0">
                      <SelectValue placeholder={'Tipo de categoria..'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INCOME">Receita</SelectItem>
                      <SelectItem value="EXPENSE">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                size={'default'}
                variant={'outline'}
                onClick={handleCreateCategoryModalOpen}
              >
                <PlusIcon />
                Criar Categoria
              </Button>
            </div>

            {isFetching && (
              <div className="w-full space-y-2">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            )}

            {hasCategories && (
              <div className="space-y-2">
                {filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="border border-gray-200/60 dark:border-muted rounded-md h-10 pl-4 flex  items-center justify-between hover:bg-accent cursor-pointer"
                    onClick={() => handleUpdateCategory(category)}
                  >
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                    </div>

                    <Button
                      variant={'destructive'}
                      size={'icon'}
                      className="bg-red-500 rounded-l-none"
                      onClick={(event) =>
                        handleDeleteModalOpen(event, category)
                      }
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </ResponsiveModal>
    </>
  )
}
