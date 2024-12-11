import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { client } from '@/lib/rpc'

export function useGetCategories() {
  const query = useQuery({
    queryKey: QUERY_KEYS.categories,
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
