'use client'

import { useCurrent } from '@/features/auth/api/use-current'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'

interface ICreateContext {
  user: Omit<User, 'password'>
  isLoading: boolean
}

export const UserContext = createContext<ICreateContext>({} as ICreateContext)

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: user, isFetching } = useCurrent()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
  }, [router, user])

  return (
    <UserContext.Provider value={{ user: user!, isLoading: isFetching }}>
      {!isFetching && children}
    </UserContext.Provider>
  )
}
