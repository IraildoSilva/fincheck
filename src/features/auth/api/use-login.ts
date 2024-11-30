import { InferRequestType, InferResponseType } from 'hono'
import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { sleep } from '@/lib/utils'
import { QUERY_KEYS } from '../constants'

type Route = typeof client.api.auth.login.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      await sleep(300)

      const response = await client.api.auth.login.$post({ json })

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.current })
      router.push('/')
    },
    onError: () => {
      toast.error('Falha ao entrar', {
        description: 'Credenciais inválidas',
      })
    },
  })

  return mutation
}
