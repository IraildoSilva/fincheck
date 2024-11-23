'use client'

import { UserContextProvider } from '@/contexts/user-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <UserContextProvider>{children}</UserContextProvider>
}
