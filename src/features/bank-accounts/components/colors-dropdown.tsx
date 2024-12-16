import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ColorIcon } from './icons/color-icon'
import { ChevronDownIcon } from 'lucide-react'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

interface ColorsDropdownInputProps {
  error?: string
  className?: string
  onChange?: (value: string) => void
  value?: string
}

type Color = {
  color: string
  bg: string
}

const colors: Color[] = [
  { color: '#FA5252', bg: '#FA525220' },
  { color: '#E64980', bg: '#E6498020' },
  { color: '#BE4BDB', bg: '#BE4BDB20' },
  { color: '#7950F2', bg: '#7950F220' },
  { color: '#4C6EF5', bg: '#4C6EF520' },
  { color: '#228BE6', bg: '#228BE620' },
  { color: '#15AABF', bg: '#15AABF20' },
  { color: '#12B886', bg: '#12B88620' },
  { color: '#40C057', bg: '#40C05720' },
  { color: '#82C91E', bg: '#82C91E20' },
  { color: '#FAB005', bg: '#FAB00520' },
  { color: '#FD7E14', bg: '#FD7E1420' },
  { color: '#868E96', bg: '#868E9620' },
  { color: '#212529', bg: '#FFFFFF' },
  { color: '#FFFFFF', bg: '#21252920' },
]

export function ColorsDropdownInput({
  className,
  error,
  onChange,
  value,
}: ColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(() => {
    if (!value) return null

    return colors.find((color) => color.color === value) ?? null
  })

  function handleSelectedColor(color: Color) {
    setSelectedColor(color)
    onChange?.(color.color)
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors relative text-muted-foreground text-base md:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              selectedColor && 'text-foreground',
              className
            )}
          >
            Cor
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 right-3 [&_svg]:size-4',
                selectedColor && '[&_svg]:size-6'
              )}
            >
              {selectedColor && (
                <ColorIcon bg={selectedColor.bg} color={selectedColor.color} />
              )}

              {!selectedColor && <ChevronDownIcon className="size-4 " />}
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-[55] grid grid-cols-4 w-[290px]">
          {colors.map((color) => (
            <DropdownMenuItem
              key={color.color}
              onSelect={() => handleSelectedColor(color)}
              className="[&_svg]:size-8 flex items-center justify-center"
            >
              <ColorIcon bg={color.bg} color={color.color} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-500">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
