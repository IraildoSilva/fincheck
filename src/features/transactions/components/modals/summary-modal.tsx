import { ResponsiveModal } from '@/components/responsive-modal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Transaction } from '@/entities/Transactions'
import { VerboseMonths } from '../../constants'
import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface SummaryModalProps {
  open: boolean
  onClose: () => void
  transactions: Array<Transaction>
}

export function SummaryModal({
  onClose,
  open,
  transactions,
}: SummaryModalProps) {
  const totalIncome = transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'INCOME' ? transaction.value : 0)
  }, 0)

  const totalExpense = transactions.reduce((acc, transactions) => {
    return acc + (transactions.type === 'EXPENSE' ? transactions.value : 0)
  }, 0)

  const balance = totalIncome - totalExpense
  const isNegativeBalance = balance < 0
  const currentMonth = VerboseMonths[new Date(transactions[0]?.date).getMonth()]

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onClose}
      dialogClassName="w-[340px]"
    >
      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold self-center">
            Resumo
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className='text-center w-full flex items-center justify-center'>
            <p className="w-[200px] mb-20 font-medium tracking-[-0.5px] text-muted-foreground">
              Resumo das suas transacões em{' '}
              <span className="text-foreground font-semibold">
                {currentMonth}
              </span>
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total receitas</span>
              <strong className="text-emerald-500 tracking-[-0.5px] font-medium">
                + {formatCurrency(totalIncome)}
              </strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total despesas </span>
              <span className="text-red-500 tracking-[-0.5px] font-medium">
                - {formatCurrency(totalExpense)}
              </span>
            </div>
            <Separator className="my-2 bg-gray-600" />
            <div className="flex justify-between items-center">
              <span className="font-semibold">Saldo</span>
              <span
                className={cn(
                  'tracking-[-0.5px] text-emerald-500 font-medium',
                  isNegativeBalance && 'text-red-500'
                )}
              >
                {isNegativeBalance ? '' : '+ '}
                {formatCurrency(balance)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
