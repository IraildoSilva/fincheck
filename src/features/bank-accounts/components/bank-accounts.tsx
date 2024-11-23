'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EyeClosed, EyeIcon } from 'lucide-react'
import { useState } from 'react'

export function BankAccounts() {
  const [open, setOpen] = useState(true)

  function handleClick() {
    setOpen((prev) => !prev)
  }

  return (
    <div className="rounded-md h-full w-full px-4 py-8 lg:p-10 flex flex-col bg-zinc-100/60 dark:bg-zinc-900/60 border border-gray-200/60 dark:border-muted  ">
      <div>
        <span className="tracking-[-0.5px] block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong
            className={cn(
              'text-[32px] tracking-[-1px] transition-all',
              !open && 'blur-md'
            )}
          >
            R$ 110,00
          </strong>

          <Button
            variant={'ghost'}
            onClick={handleClick}
            size={'icon'}
            className="[&_svg]:size-5"
          >
            {open && <EyeIcon />}
            {!open && <EyeClosed />}
          </Button>
        </div>
      </div>
    </div>
  )
}
