'use client'

import { useTheme } from 'next-themes'

import {
  Loader2,
  LogOutIcon,
  Moon,
  Settings2Icon,
  Sun,
  UserIcon,
} from 'lucide-react'

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
import { useCurrent } from '@/features/auth/api/use-current'
import { useState } from 'react'
import { CategoriesModal } from '@/features/categories/components/categories-modal'

export function UserButton() {
  const [isCategoriesModalOpen, setIsCategoryModalOpen] = useState(false)
  const { setTheme } = useTheme()
  const { mutate: handleLogout } = useLogout()

  const { data: user, isFetching: isLoading } = useCurrent()

  const avatar = user?.name.slice(0, 2).toUpperCase()

  function handleCategoryModalOpen() {
    setIsCategoryModalOpen((prevState) => !prevState)
  }

  return (
    <>
      <CategoriesModal
        open={isCategoriesModalOpen}
        onClose={handleCategoryModalOpen}
      />
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

          <DropdownMenuItem className="flex items-center">
            <UserIcon />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center"
            onClick={() => handleCategoryModalOpen()}
          >
            <Settings2Icon />
            Categorias
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="md:flex">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
            className="flex items-center"
            onClick={() => handleLogout()}
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
