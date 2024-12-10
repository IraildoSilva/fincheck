import { ResponsiveModal } from '@/components/responsive-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetBankAccounts } from '@/features/bank-accounts/api/use-get-bank-accounts'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'

interface FiltersModal {
  open: boolean
  onClose: () => void
  onApplyFilters: (filters: {
    bankAccountId: string | undefined
    year: number
  }) => void
}

export function FiltersModal({ onClose, open, onApplyFilters }: FiltersModal) {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | undefined
  >(undefined)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId
    )
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step)
  }

  const { data: accounts } = useGetBankAccounts()

  return (
    <ResponsiveModal
      dialogClassName={'max-w-[400px]'}
      open={open}
      onOpenChange={onClose}
      // title="Filtros"
    >
      <Card className="rounded-md border-none shadow-none">
        <CardHeader className="">
          <CardTitle className="text-lg font-bold self-center">
            Filtros
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div>
            <span className="text-lg font-bold tracking-[-1px]">Conta</span>

            <div className="space-y-2 mt-2">
              {accounts?.map((bankAccount) => (
                <button
                  key={bankAccount.id}
                  onClick={() => handleSelectBankAccount(bankAccount.id)}
                  className={cn(
                    'p-2 rounded-md w-full text-left hover:bg-accent duration-150 transition-colors ',
                    selectedBankAccountId === bankAccount.id &&
                      '!bg-muted-foreground/30'
                  )}
                >
                  {bankAccount.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <span className="text-lg font-bold tracking-[-1px]">Ano</span>

            <div className="mt-2 w-52 flex items-center justify-between">
              <button
                onClick={() => handleChangeYear(-1)}
                className="w-12 h-12 flex items-center justify-center"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>

              <div className="flex-1 text-center">
                <span className="text-sm font-medium tracking-[-0.5px]">
                  {selectedYear}
                </span>
              </div>

              <button
                onClick={() => handleChangeYear(1)}
                className="w-12 h-12 flex items-center justify-center"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          <Button
            className="w-full mt-10"
            onClick={() => {
              onClose()
              onApplyFilters({
                bankAccountId: selectedBankAccountId ?? undefined,
                year: selectedYear,
              })
            }}
          >
            Aplicar Filtros
          </Button>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )
}
