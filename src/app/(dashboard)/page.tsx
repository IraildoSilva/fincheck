'use client'

import { Logo } from '@/components/logo'
import { ToggleTheme } from '@/components/toggle-theme'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/features/auth/api/use-logout'
import { BankAccounts } from '@/features/bank-accounts/components/bank-accounts'

export default function Dashboard() {
  const { mutate: handleLogout } = useLogout()

  return (
    <div className="h-full max-h-screen p-4 lg:px-8 lg:pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <Logo className="text-primary h-6" />

        <ToggleTheme />
        <Button onClick={() => handleLogout()}>Sair</Button>
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
