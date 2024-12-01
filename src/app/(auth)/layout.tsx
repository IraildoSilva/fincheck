import { Logo } from '@/components/logo'
import RedirectButton from '@/components/redirect-button'
import { auth } from '@/features/auth/queries'
import { redirect } from 'next/navigation'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await auth()

  if (user) {
    redirect('/')
  }
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
