import { InferRequestType, InferResponseType } from 'hono'
import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS } from '../constants'

type Route = typeof client.api.auth.register.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useRegister() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json })

      if (!response.ok) {
        throw new Error('Failed to register')
      }

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.current })
      router.push('/')
    },
    onError: () => {
      toast.error('Falha ao cadastrar', {
        description: 'Pedimos desculpas, tente novamente mais tarde.',
      })
    },
  })

  return mutation
}
