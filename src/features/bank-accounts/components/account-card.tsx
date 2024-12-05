import { cn } from '@/lib/utils'
import { BankAccount } from '@/entities/BankAccount'
import { BankAccountTypeIcon } from '@/components/icons/bank-account-type-icon'

interface AccountCardProps {
  data: BankAccount
}

export function AccountCard({ data }: AccountCardProps) {
  const { color, type, name, currentBalance } = data

  return (
    <div className="border border-gray-200/60 dark:border-muted rounded-md">
      <div
        className="flex-1 h-[200px] rounded-md p-4 flex flex-col justify-between border-b-4 border-red-600"
        style={{ borderColor: color }}
        // onClick={() => openEditAccountModal(data)}
        role="button"
      >
        <div>
          <BankAccountTypeIcon type={type} />

          <span className=" font-medium tracking-[-0.5px] block mt-4">
            {name}
          </span>
        </div>

        <div className="">
          <span
            className={cn(
              ' font-medium tracking-[-0.5px] block'
              // !areValuesVisible && 'blur-sm'
            )}
          >
            {currentBalance}
          </span>
          <small className="text-muted-foreground text-sm">Saldo atual</small>
        </div>
      </div>
    </div>
  )
}