'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EyeClosed, EyeIcon, Loader2, PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useGetBankAccounts } from '../api/use-get-bank-accounts'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SliderNavigation } from '@/components/slider-navigation'
import { useWindowWidth } from '@/hooks/use-window-width'
import { AccountCard } from './account-card'

export function BankAccounts() {
  const windowWidth = useWindowWidth()
  const [open, setOpen] = useState(true)
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })
  const { data: accounts, isFetching } = useGetBankAccounts()

  const currentBalance = useMemo(() => {
    return accounts?.reduce(
      (total, account) => total + account.currentBalance,
      0
    )
  }, [accounts])

  function handleClick() {
    setOpen((prev) => !prev)
  }

  if (!accounts) {
    return []
  }

  return (
    <div className="rounded-md h-full w-full px-4 py-8 lg:p-10 flex flex-col bg-zinc-100/60 dark:bg-zinc-900/60 border border-gray-200/60 dark:border-muted  ">
      {isFetching && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="text-primary  w-10 h-10 animate-spin" />
        </div>
      )}

      {!isFetching && (
        <>
          <div>
            <span className="tracking-[-0.5px] block">Saldo total</span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-[32px] tracking-[-1px] transition-all',
                  !open && 'blur-md'
                )}
              >
                {currentBalance}
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

          <div className="flex-1 flex flex-col justify-end mt-10 lg:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="tracking-[-1px] text-white text-lg font-bold">
                    Minhas contas
                  </strong>
                </div>

                <button
                  // onClick={openNewAccountModal}
                  className="mt-4 h-52 border-2 border-teal-600 rounded-2xl border-dashed flex flex-col items-center justify-center gap-4 text-white"
                >
                  <div className="w-11 h-11 rounded-full border-dashed border-2 flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>

                  <span className="font-medium tracking-[-0.5px] block text-center w-32">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={windowWidth! > 500 ? 16 : 8}
                  slidesPerView={windowWidth! > 500 ? 2.2 : 1.1}
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    })
                  }}
                >
                  <div
                    slot="container-start"
                    className="flex items-center justify-between mb-4"
                  >
                    <strong className="tracking-[-1px] text-lg font-bold">
                      Minhas contas
                    </strong>

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
