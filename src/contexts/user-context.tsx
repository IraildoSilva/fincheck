'use client'

import { useCurrent } from '@/features/auth/api/use-current'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { createContext } from 'react'

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

  if (!user) {
    router.push('/login')
    return
  }

  return (
    <UserContext.Provider value={{ user, isLoading: isFetching }}>
      {!isFetching && children}
    </UserContext.Provider>
  )
}
