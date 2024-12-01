'use client'

import { useTheme } from 'next-themes'

import { Loader2, LogOutIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useLogout } from '@/features/auth/api/use-logout'
import { User } from '@/entities/User'

interface UserButtonProps {
  isLoading?: boolean
  user: User
}

export function UserButton({ isLoading, user }: UserButtonProps) {
  const { setTheme } = useTheme()
  const { mutate: handleLogout } = useLogout()

  const avatar = user?.name.slice(0, 2).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback className="cursor-pointer text-sm font-medium tracking-[-0.5px]">
            {!isLoading && avatar}
            {isLoading && <Loader2 className="animate-spin size-5" />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-60">
        <DropdownMenuLabel className="px-5">
          <div className="flex gap-4 items-center">
            <Avatar className="bg-zinc-500/25 w-10 h-10 rounded-full flex items-center justify-center cursor-default">
              <AvatarFallback className="font-medium text-sm tracking-[-0.5px]">
                {avatar}
              </AvatarFallback>
            </Avatar>

            <div>
              <span className="block leading-4">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="pl-10 pr-5 flex items-center justify-between ">
          Perfil
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="pl-10 pr-5 hidden md:flex">
            Tema
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="">
              <DropdownMenuItem
                className="flex items-center justify-between "
                onClick={() => setTheme('light')}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between "
                onClick={() => setTheme('dark')}
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between "
                onClick={() => setTheme('system')}
              >
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center justify-between  pl-10 pr-5 "
          onClick={() => handleLogout()}
        >
          <span>Sair</span>
          <LogOutIcon className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
