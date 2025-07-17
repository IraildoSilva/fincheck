import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'

const FIVE_MIN_IN_MILLISECONDS = 5 * 60 * 1000

export function useGetCategories() {
  const query = useQuery({
    queryKey: QUERY_KEYS.categories,
    staleTime: FIVE_MIN_IN_MILLISECONDS,
    queryFn: async () => {
      const response = await client.api.categories.$get()

      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      const { data } = await response.json()

      return data
    },
  })

  return query
}
