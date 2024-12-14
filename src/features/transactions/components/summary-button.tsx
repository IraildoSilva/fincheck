import { Button } from '@/components/ui/button'
// import { FileCheck2Icon } from 'lucide-react'
import { HiOutlineDocumentCheck } from "react-icons/hi2";


interface SummaryButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function SummaryButton({ onClick, disabled }: SummaryButtonProps) {
  return (
    <Button
      variant="ghost"
      disabled={disabled}
      className="py-1 h-6 px-4 outline-none text-sm flex border-none transition-colors cursor-pointer hover:bg-transparent [&_svg]:size-5"
      onClick={onClick}
    >
      <HiOutlineDocumentCheck className="inline" />
      <span>Resumo</span>
    </Button>
  )
}
