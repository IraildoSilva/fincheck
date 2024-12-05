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
    <div className="">
      <button
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
        className="rounded-full p-3 enabled:hover:bg-black/10 transition ease-in duration-150 disabled:opacity-40"
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        className="rounded-full p-3 enabled:hover:bg-black/10 transition ease-in duration-150 disabled:opacity-40 "
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  )
}
