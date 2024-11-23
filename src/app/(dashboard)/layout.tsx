'use client'

import { useCurrent } from '@/features/auth/api/use-current'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: user } = useCurrent()
  const router = useRouter()

  if (!user) router.push('/login')

  return children
}
