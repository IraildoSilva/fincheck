import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'
import { QUERY_KEYS } from '../constants'
import { QUERY_KEYS as ACCOUNT_QUERY_KEY } from '@/features/bank-accounts/constants'

type Route = (typeof client.api.transactions)[':transactionId']['$delete']

type RequestType = InferRequestType<Route>
type ResponseType = InferResponseType<Route>

export function useDeleteTransaction() {
	const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.transactions[':transactionId'].$delete({
        param,
      })

      if (!response.ok) {
        throw new Error('Failed to delete transaction')
      }

      const data = response.json()

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions })
      queryClient.invalidateQueries({
        queryKey: ACCOUNT_QUERY_KEY.bankAccounts,
      })

      toast.success('Transação deletada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao deletar transação!')
    },
  })

  return mutation
}
