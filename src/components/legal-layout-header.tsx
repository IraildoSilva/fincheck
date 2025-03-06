'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'

export function LegalLayoutHeader() {
  const pathname = usePathname()
  const isTermRoute = pathname === '/terms'

  const termsLastUpdate = '04/03/2025'
  const privacyPolicyLastUpdate = '04/03/2025'

  return (
    <header className="pt-10 flex justify-between">
      <div className="space-y-5">
        <h1 className="text-primary text-3xl font-bold">
          {isTermRoute ? 'Termos de Serviço' : 'Política de Privacidade'}
        </h1>

        <p className="text-muted-foreground">
          Última atualização:{' '}
          {isTermRoute ? termsLastUpdate : privacyPolicyLastUpdate}
        </p>
      </div>

      <div>
        <Link href={'/register'}>
          <Button variant={'secondary'}>{'Criar conta'}</Button>
        </Link>
      </div>
    </header>
  )
}
