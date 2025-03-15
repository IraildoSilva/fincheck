'use client'

import { Logo } from '@/components/logo'
import { BankAccounts } from '@/features/bank-accounts/components/bank-accounts'
import { Transactions } from '@/features/transactions/components/transactions'
import { Fab } from '@/components/fab'
import { CreateTransactionModal } from '@/features/transactions/components/modals/create-transaction-modal'
import { CreateBankAccountModal } from '@/features/bank-accounts/components/modals/create-bank-account-modal'
import { UpdateBankAccountModal } from '@/features/bank-accounts/components/modals/update-bank-account-modal'
import { useDashboard } from '@/hooks/use-dashboard'
import { UserButton } from '@/components/user-button'
import { ToggleTheme } from '@/components/toggle-theme'

export default function Dashboard() {
  const { accountBeingEdited } = useDashboard()

  return (
    <div className="h-full w-full max-h-screen p-4 lg:px-7 lg:pt-4 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="text-primary h-6" />

        <div className='flex items-center justify-center gap-x-2'>
          <ToggleTheme/>
          <UserButton />
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:pr-4 max-h-[calc(100%-64px)]">
        <div className="w-full h-full lg:w-1/2">
          <BankAccounts />
        </div>
        <div className="w-full h-full lg:w-1/2">
          <Transactions />
        </div>
      </main>

      <Fab />
      <CreateTransactionModal />
      <CreateBankAccountModal />
      {accountBeingEdited && <UpdateBankAccountModal />}
    </div>
  )
}
