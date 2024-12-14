import { DashboardProvider } from '@/contexts/dashboard-context'
import { auth } from '@/features/auth/queries'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await auth()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  )
}
