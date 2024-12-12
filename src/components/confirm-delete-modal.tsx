import { Loader2 } from 'lucide-react'
import { TrashIcon } from './icons/trash-icon'
import { ResponsiveModal } from './responsive-modal'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'

interface ConfirmDeleteModalProps {
  onConfirm: () => void
  onClose: () => void
  title: string
  description?: string
  isLoading: boolean
}

export function ConfirmDeleteModal({
  onConfirm,
  onClose,
  title,
  description,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <ResponsiveModal open onOpenChange={onClose} dialogClassName="w-[340px]">
      <Card>
        <CardHeader className="flex flex-col items-center text-center gap-6 border-none shadow-none">
          <div className="w-[52px] h-[52px] rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
            <TrashIcon className="w-6 h-6 text-red-500" />
          </div>

          <p className="w-[180px] font-bold tracking-[-0.5px]">
            {title}
          </p>

          {description && (
            <p className="tracking-[-0.5px] text-gray-800">{description}</p>
          )}
        </CardHeader>

        <CardContent className="mt-10 space-y-4">
          <Button
            variant={'destructive'}
            className="w-full"
            onClick={onConfirm}
          >
            {!isLoading && 'Sim, desejo excluir'}
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
