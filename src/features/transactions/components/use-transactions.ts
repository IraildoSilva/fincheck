'use client'

import { useState, useEffect, useCallback } from 'react'
import { useGetTransactions } from '../api/use-get-transactions'
import { Transaction } from '@/entities/Transactions'
import { useDashboard } from '@/hooks/use-dashboard'

export type TransactionsFilters = {
  month: number
  year: number
  bankAccountId?: string
  type?: 'INCOME' | 'EXPENSE'
}

export function useTransactions() {
  const { areValuesVisible } = useDashboard()
  const [slideState, setSlideState] = useState({
    isBeginning: true,
    isEnd: false,
  })
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<null | Transaction>(null)

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  const {
    data: transactions,
    isFetching,
    isLoading: isInitialLoading,
    refetch: refetchTransactions,
  } = useGetTransactions(filters) //TODO Send filters in the request

  const sortedTransactions = transactions?.sort((a, b) => {
    const ADate = new Date(a.date).getTime()
    const BDate = new Date(b.date).getTime()

    if (ADate === BDate) {
      const ACreatedAt = new Date(a.createdAt).getTime()
      const BCreatedAt = new Date(b.createdAt).getTime()

      return BCreatedAt - ACreatedAt
    }

    return BDate - ADate
  })

  useEffect(() => {
    refetchTransactions()
  }, [filters, refetchTransactions])

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }))
    }
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined
    year: number
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId)
    handleChangeFilters('year')(year)
  }

  const handleOpenFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(true)
  }, [])

  const handleCloseFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(false)
  }, [])

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true)
    setTransactionBeingEdited(transaction)
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false)
    setTransactionBeingEdited(null)
  }

  const handleOpenSummaryModal = useCallback(() => {
    setIsSummaryModalOpen(true)
  }, [])

  const handleCloseSummaryModal = useCallback(() => {
    setIsSummaryModalOpen(false)
  }, [])

  return {
    slideState,
    setSlideState,
    areValuesVisible,
    isInitialLoading,
    isLoading: isFetching,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    transactions: sortedTransactions ?? [],
    filters,
    handleChangeFilters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenSummaryModal,
    handleCloseSummaryModal,
    isSummaryModalOpen,
  }
}
