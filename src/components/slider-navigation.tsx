import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useSwiper } from 'swiper/react'
import { Button } from './ui/button'

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
      <Button
        variant={'ghost'}
        size={'icon'}
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
        className="rounded-full p-5 transition ease-in duration-150 disabled:opacity-40 [&_svg]:size-5"
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        variant={'ghost'}
        size={'icon'}
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        className="rounded-full p-5 transition ease-in duration-150 disabled:opacity-40 [&_svg]:size-5"
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
