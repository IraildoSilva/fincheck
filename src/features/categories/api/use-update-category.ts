import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { QUERY_KEYS } from '../constants'
import { toast } from 'sonner'

type Route = (typeof client.api)['categories'][':categoryId']['$put']

type RequestType = InferRequestType<Route>
type ResponseType = InferResponseType<Route>

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api['categories'][':categoryId']['$put']({
        json,
        param,
      })

      if (!response.ok) {
        throw new Error('Failed to update Category')
      }

      const data = await response.json()

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
      toast.success('Categoria editada com sucesso!')
    },
    onError: () => {
      toast.error('Ocorreu um erro ao editar categoria!')
    },
  })

  return mutation
}
