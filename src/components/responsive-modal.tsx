import { useMedia } from 'react-use'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { useRef, useEffect } from 'react'

interface ResponsiveModalProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  dialogClassName?: string
  drawerClassname?: string
}

export function ResponsiveModal({
  children,
  onOpenChange,
  open,
  dialogClassName,
  drawerClassname,
}: ResponsiveModalProps) {
  const isDesktop = useMedia('(min-width: 1024px)', true)

  const formContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (formContainerRef.current) {
        formContainerRef.current.style.setProperty(
          'bottom',
          `env(safe-area-inset-bottom)`
        )
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      handleResize() // Initial call in case the keyboard is already open
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            'w-full max-w-lg p-0 border overflow-y-auto hide-scrollbar max-h-[85vh]',
            dialogClassName
          )}
        >
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className={cn('outline-none', drawerClassname)}
        ref={formContainerRef}
      >
        <div className="overflow-y-auto hide-scrollbar">{children}</div>
      </DrawerContent>
    </Drawer>
  )
}
