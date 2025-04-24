'use client'

import { useDashboard } from '@/hooks/use-dashboard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { PlusIcon } from '@radix-ui/react-icons'
import { BankAccountIcon } from './icons/bank-accounts-icon'
import { CategoryIcon } from '@/features/transactions/components/categories/category-icon'

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard()

  return (
    <div className="fixed bottom-3 right-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center text-background shadow-md shadow-zinc-900">
            <PlusIcon className="size-6" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top">
          <DropdownMenuItem
            className="gap-2 [&>svg]:size-8"
            onSelect={() => {
              openNewTransactionModal('EXPENSE')
            }}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 [&>svg]:size-8"
            onSelect={() => {
              openNewTransactionModal('INCOME')
            }}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 [&>svg]:size-8"
            onSelect={() => {
              openNewTransactionModal('TRANSFER')
            }}
          >
            <CategoryIcon type="transfer" />
            Nova Transferência
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={openNewAccountModal}
            className="gap-2 [&>svg]:size-8"
          >
            <BankAccountIcon />
            Nova Conta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
