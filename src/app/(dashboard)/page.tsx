import { Logo } from '@/components/logo'
import { BankAccounts } from '@/features/bank-accounts/components/bank-accounts'
import { UserButton } from '@/components/user-button'
import { auth } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import { Transactions } from '@/features/transactions/components/transactions'
import { DashboardProvider } from '@/contexts/dashboard-context'
import { Fab } from '@/components/fab'
import { CreateTransactionModal } from '@/features/transactions/components/modals/create-transaction-modal'
import { CreateBankAccountModal } from '@/features/bank-accounts/components/modals/create-bank-account-modal'

export default async function Dashboard() {
  const user = await auth()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardProvider>
      <div className="h-full w-full max-h-screen p-4 lg:px-7 lg:pt-4 flex flex-col gap-4">
        <header className="h-12 flex items-center justify-between">
          <Logo className="text-primary h-6" />

          <UserButton user={user} />
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
      </div>
    </DashboardProvider>
  )
}
