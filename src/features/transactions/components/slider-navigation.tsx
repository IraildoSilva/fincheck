import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useSwiper } from 'swiper/react'

interface SliderNavigationProps {
  isBeginning: boolean
  isEnd: boolean
}

export function SliderNavigation({
  isBeginning,
  isEnd,
}: SliderNavigationProps) {
  const swiper = useSwiper()

  return (
    <>
      <button
        disabled={isBeginning}
        onClick={() => swiper.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-background to-transparent disabled:opacity-40"
      >
        <ChevronLeftIcon className="size-5" />
      </button>

      <button
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-gradient-to-l from-background to-transparent disabled:opacity-40"
      >
        <ChevronRightIcon className="size-5" />
      </button>
    </>
  )
}
