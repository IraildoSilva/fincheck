import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { client } from '@/lib/rpc'

export function useGetTransactions() {
  const query = useQuery({
    queryKey: QUERY_KEYS.transactions,
    queryFn: async () => {
      const response = await client.api.transactions.$get()

      if (!response.ok) {
        return null
      }

      const { data } = await response.json()

      return data
    },
  })

  return query
}
