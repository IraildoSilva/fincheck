'use client'

import { Logo } from '@/components/logo'
import { BankAccounts } from '@/features/bank-accounts/components/bank-accounts'
import { UserButton } from '@/components/user-button'
import { useUserContext } from '@/hooks/use-user-context'

export default function Dashboard() {
  const { user, isLoading } = useUserContext()

  const avatar = user?.name.slice(0, 2).toUpperCase()

  return (
    <div className="h-full max-h-screen p-4 lg:px-8 lg:pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="text-primary h-6" />

        <UserButton user={user} isLoading={isLoading} avatar={avatar} />
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4 lg:pr-4 max-h-[calc(100%-64px)]">
        <div className="w-full h-full lg:w-1/2">
          <BankAccounts />
        </div>
        <div className="w-full h-full lg:w-1/2">{/* Transactions */}</div>
      </main>
    </div>
  )
}
