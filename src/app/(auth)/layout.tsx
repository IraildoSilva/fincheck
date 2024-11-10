import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full h-screen">
      <header className="fixed h-[80px] w-full flex justify-between items-center px-7">
        <Logo className="h-6 text-primary" />
        <Link href={'/register'}>
          <Button variant={'secondary'}>Criar conta</Button>
        </Link>
      </header>
      {children}
    </div>
  )
}
