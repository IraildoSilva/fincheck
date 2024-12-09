import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { client } from '@/lib/rpc'
import { TransactionsFilters } from '../components/use-transactions'

export function useGetTransactions(filters: TransactionsFilters) {
  const parsedFilters = {
    ...filters,
    year: filters.year.toString(),
    month: filters.month.toString(),
  }

  const query = useQuery({
    queryKey: QUERY_KEYS.transactions,
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: parsedFilters,
      })

      if (!response.ok) {
        return null
      }

      const { data } = await response.json()

      return data ?? []
    },
  })

  return query
}
