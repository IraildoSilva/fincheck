import { cn } from '@/lib/utils'
import { useSwiper } from 'swiper/react'

interface SliderOptionProps {
  isActive: boolean
  month: string
  index: number
}

export function SliderOption({ isActive, month, index }: SliderOptionProps) {
  const swiper = useSwiper()

  return (
    <div
      onClick={() => swiper.slideTo(index)}
      role="button"
      className={cn(
        'flex items-center justify-center w-full rounded-full h-12 text-sm tracking-[-0.5px] text-gray-800 font-medium',
        isActive && 'bg-white'
      )}
    >
      {month}
    </div>
  )
}
