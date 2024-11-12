'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  const isLogin = pathname === '/login'

  return (
    <div className="w-full h-screen">
      <header className="fixed h-[80px] w-full flex justify-between items-center px-7">
        <Logo className="h-6 text-primary" />
        <Link href={isLogin ? '/register' : '/login'}>
          <Button variant={'secondary'}>
            {isLogin ? 'Criar conta' : 'Login'}
          </Button>
        </Link>
      </header>
      {children}
    </div>
  )
}

// TODO
//   ADD HONO
//   ADD QUERY CLIENT
//   ADD PRISMA
//   CREATE AUTH ROUTE