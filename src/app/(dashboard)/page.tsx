import { Logo } from '@/components/logo'
import { BankAccounts } from '@/features/bank-accounts/components/bank-accounts'
import { UserButton } from '@/components/user-button'
import { auth } from '@/features/auth/queries'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const user = await auth()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="h-full min-h-screen p-4 lg:px-7 lg:pt-4 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="text-primary h-6" />

        <UserButton user={user} />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:pr-4 max-h-[calc(100%-64px)]">
        <div className="w-full lg:min-h-full lg:w-1/2">
          <BankAccounts />
        </div>
        <div className="w-full lg:min-h-full lg:w-1/2">
          {/* Transactions */}
        </div>
      </main>
    </div>
  )
}
