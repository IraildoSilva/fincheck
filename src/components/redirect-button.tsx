'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

export default function RedirectButton() {
  const pathname = usePathname()
  const isLoginRoute = pathname === '/login'

  return (
    <Link href={isLoginRoute ? '/register' : '/login'}>
      <Button variant={'secondary'}>
        {isLoginRoute ? 'Criar conta' : 'Login'}
      </Button>
    </Link>
  )
}
