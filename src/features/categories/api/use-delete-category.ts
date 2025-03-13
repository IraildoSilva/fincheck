import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { QUERY_KEYS } from '../constants'
import { QUERY_KEYS as TRANSACTIONS_QUERY_KEYS } from '@/features/transactions/constants'
import { toast } from 'sonner'

type Route = (typeof client.api)['categories'][':categoryId']['$delete']

type RequestType = InferRequestType<Route>
type ResponseType = InferResponseType<Route>

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api['categories'][':categoryId'][
        '$delete'
      ]({
        param,
      })

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      const data = await response.json()

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.categories })
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEYS.transactions,
      })
      toast.success('Categoria deletada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao deletar categoria!')
    },
  })

  return mutation
}
