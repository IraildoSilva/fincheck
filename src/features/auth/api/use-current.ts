import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'

export function useCurrent() {
  const query = useQuery({
    queryKey: QUERY_KEYS.current,
    queryFn: async () => {
      const response = await client.api.auth.current.$get()

      if (!response.ok) {
        return null
      }

      const { data } = await response.json()

      return data
    },
    staleTime: Infinity,
  })

  return query
}
