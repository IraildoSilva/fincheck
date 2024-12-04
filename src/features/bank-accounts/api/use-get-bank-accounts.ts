import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { client } from '@/lib/rpc'

export function useGetBankAccounts() {
  const query = useQuery({
    queryKey: QUERY_KEYS.bankAccounts,
    queryFn: async () => {
      const response = await client.api['bank-accounts'].$get()

      if (!response.ok) {
        return null
      }

      const { data } = await response.json()

      return data
    },
  })

  return query
}
