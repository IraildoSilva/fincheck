'use client'

import { useRouter } from 'next/navigation'

import { Logo } from '@/components/logo'
import { useCurrent } from '@/features/auth/api/use-current'
import { useEffect } from 'react'
import RedirectButton from '@/components/redirect-button'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data: user } = useCurrent()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [user, router])

  return (
    <div className="w-full h-screen">
      <header className="fixed h-[80px] w-full flex justify-between items-center px-7">
        <Logo className="h-6 text-primary" />
        <RedirectButton />
      </header>
      {children}
    </div>
  )
}
