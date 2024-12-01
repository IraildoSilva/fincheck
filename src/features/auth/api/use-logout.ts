import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants'

type Route = typeof client.api.auth.logout.$post

type ResponseType = InferResponseType<Route>

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post()

      if (!response.ok) {
        throw new Error('Failed to log out')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Saindo da sua conta', {
        description: 'Até breve!',
      })
      router.push('/login')
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.current })
    },
    onError: () => {
      toast.error('Failed to log out')
    },
  })

  return mutation
}
