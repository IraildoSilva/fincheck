import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants'

type Route = (typeof client.api)['categories']['$post']

type RequestType = InferRequestType<Route>
type ResponseType = InferResponseType<Route>

export function useCreateCategory() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api['categories']['$post']({ json })

      if (!response.ok) {
        throw new Error('Failed to create category')
      }

      const data = await response.json()

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
      toast.success('Categoria cadastrada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao cadastrar categoria!')
    },
  })

  return mutation
}
