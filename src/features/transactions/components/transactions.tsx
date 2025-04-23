'use client'

import { formatCurrency } from '@/lib/format-currency'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTransactions } from './use-transactions'
import { MONTHS } from '../constants'
import { SliderOption } from './slider-option'
import { CategoryIcon } from './categories/category-icon'
import { formatDate } from '@/lib/format-date'
import { SliderNavigation } from './slider-navigation'
import { TransactionTypeDropdown } from './transactions-type-drowdown'
import { FiltersModal } from './filters-modal'
import { FilterIcon } from './filter-icon'
import { EditTransactionModal } from './modals/edit-transaction-modal'
import { SummaryModal } from './modals/summary-modal'
import { SummaryButton } from './summary-button'
import { EmptyState } from './empty-state'

export function Transactions() {
  const {
    slideState,
    setSlideState,
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleOpenEditModal,
    handleCloseEditModal,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenSummaryModal,
    handleCloseSummaryModal,
    isSummaryModalOpen,
  } = useTransactions()

  const hasTransactions = transactions.length > 0
  return (
    <div
      className={cn(
        'rounded-md lg:h-full h-fit w-full mb-5 px-4 py-5 lg:p-5 flex flex-col border border-gray-200/60 dark:border-muted',
        isLoading && 'h-full',
        isInitialLoading && 'h-full'
      )}
    >
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            onApplyFilters={handleApplyFilters}
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
          />

          {hasTransactions && (
            <SummaryModal
              open={isSummaryModalOpen}
              onClose={handleCloseSummaryModal}
              transactions={transactions}
            />
          )}

          <header>
            <div className="flex justify-between items-center">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <div className="flex gap-3">
                <SummaryButton
                  onClick={handleOpenSummaryModal}
                  disabled={!hasTransactions || isLoading}
                />

                <button onClick={handleOpenFiltersModal}>
                  <FilterIcon />
                </button>
              </div>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                spaceBetween={16}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={({ isBeginning, isEnd, realIndex }) => {
                  setSlideState({
                    isBeginning,
                    isEnd,
                  })

                  handleChangeFilters('month')(realIndex)
                }}
              >
                <SliderNavigation
                  isBeginning={slideState.isBeginning}
                  isEnd={slideState.isEnd}
                />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <main className="mt-4 space-y-2 flex-1 md:overflow-y-auto px-1">
            {isLoading && (
              <div className="flex flex-col h-full items-center justify-center">
                <Loader2 className="size-10 animate-spin" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col h-full items-center justify-center">
                <EmptyState />

                <p className="text-muted-foreground">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}
                {transactions.map((transaction) => (
                  <div
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                    key={transaction.id}
                    className="bg-zinc-100/60 dark:bg-zinc-900/60 p-2 rounded-md flex items-center justify-between gap-4 border border-gray-200/60 dark:border-muted"
                  >
                    <div className="flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === 'INCOME' ? 'income' : transaction.type === 'EXPENSE' ?  'expense' : 'transfer'
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <div className="flex gap-2">
                          <strong className="font-semibold tracking-[-0.5px] leading-none">
                            {transaction.name}
                          </strong>
                          <span
                            className="text-xs px-2 rounded-md"
                            style={{
                              background: `${transaction.bankAccount.color}10`,
                              color: `${transaction.bankAccount.color}`,
                            }}
                          >
                            {transaction.bankAccount.name}
                          </span>
                        </div>
                        <div className="flex flex-col text-gray-600">
                          <span className="text-xs leading-1">
                            {transaction.category?.name}
                          </span>

                          <span
                            className={cn(
                              'text-xs leading-none',
                              !transaction.category && 'leading-1'
                            )}
                          >
                            {formatDate(new Date(transaction.date))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'text-red-500 font-medium tracking-[-0.5px] text-nowrap',
                        !areValuesVisible && 'blur-sm',
                        transaction.type === 'INCOME' && 'text-emerald-500'
                      )}
                    >
                      {transaction.type === 'INCOME' ? '+ ' : '- '}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </main>
        </>
      )}
    </div>
  )
}
