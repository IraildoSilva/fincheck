import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { IncomeIcon } from './transactions-icons/income-icon'
import { ExpensesIcon } from './transactions-icons/expenses-icon'
import { TransactionsIcon } from './transactions-icons/transactions-icon'
import { ChevronDownIcon } from 'lucide-react'

type TransactionType = 'INCOME' | 'EXPENSE' | undefined

interface TransactionTypeDropdownProps {
  onSelect: (type: TransactionType) => void
  selectedType: TransactionType
}

export function TransactionTypeDropdown({
  onSelect,
  selectedType,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className="flex items-center gap-2">
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm tracking-[-0.5px] font-medium">
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === undefined && 'Transações'}
          </span>

          <ChevronDownIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuItem
          onSelect={() => onSelect('INCOME')}
          className="gap-2 cursor-pointer [&_svg]:size-6"
        >
          <IncomeIcon />
          Receitas
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => onSelect('EXPENSE')}
          className="gap-2 cursor-pointer [&_svg]:size-6"
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => onSelect(undefined)}
          className="gap-2 cursor-pointer [&_svg]:size-6"
        >
          <TransactionsIcon />
          Transações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
