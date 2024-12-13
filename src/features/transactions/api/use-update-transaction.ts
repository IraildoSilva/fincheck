import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { QUERY_KEYS } from '../constants'
import { QUERY_KEYS as ACCOUNT_QUERY_KEY } from '@/features/bank-accounts/constants'
import { toast } from 'sonner'

type Route = (typeof client.api.transactions)[':transactionId']['$put']

type RequestType = InferRequestType<Route>
type ResponseType = InferResponseType<Route>

export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.transactions[':transactionId'].$put({
        json,
        param,
      })

      if (!response.ok) {
        throw new Error('Failed to update transaction')
      }

      const data = await response.json()

      return data
    },
    onSuccess: ({ data: transaction }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions })
      queryClient.invalidateQueries({
        queryKey: ACCOUNT_QUERY_KEY.bankAccounts,
      })
      toast.success(
        transaction.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      )
    },
    onError: () => {
      toast.error('Erro ao editar transação!')
    },
  })

  return mutation
}
