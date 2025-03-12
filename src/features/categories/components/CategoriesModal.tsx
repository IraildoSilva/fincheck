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
import { useMemo, useState } from 'react'
import { PlusIcon } from 'lucide-react'

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

export function CategoriesModal({ open, onClose }: CategoriesModalProps) {
  const [categoryFilter, setCategoryFilter] = useState('INCOME')
  const { data: categories, isFetching } = useGetCategories()

  function handleCategoryFilter(type: 'INCOME' | 'EXPENSE') {
    setCategoryFilter(type)
  }

  const filteredCategories = useMemo(() => {
    return categories?.filter((category) => category.type === categoryFilter)
  }, [categories, categoryFilter])

  const hasCategories = filteredCategories && !isFetching
  return (
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
                  defaultValue="INCOME"
                  onValueChange={handleCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={'Receita'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INCOME">Receita</SelectItem>
                    <SelectItem value="EXPENSE">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button size={'default'} variant={'outline'}>
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
                >
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>

                  <Button
                    variant={'destructive'}
                    size={'icon'}
                    className="bg-red-500 rounded-l-none"
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
  )
}
