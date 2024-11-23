'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useCurrent } from '@/features/auth/api/use-current'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data: user } = useCurrent()
  const router = useRouter()

  if (user) router.push('/')

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
