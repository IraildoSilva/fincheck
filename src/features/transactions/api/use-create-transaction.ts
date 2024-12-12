import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { QUERY_KEYS } from '../constants'
import { QUERY_KEYS as ACCOUNT_QUERY_KEY } from '@/features/bank-accounts/constants'
import { toast } from 'sonner'

type Route = typeof client.api.transactions.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.transactions.$post({ json })

      if (!response.ok) {
        throw new Error('Failed to create transaction')
      }

      const data = await response.json()

      return data
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions })
      queryClient.invalidateQueries({
        queryKey: ACCOUNT_QUERY_KEY.bankAccounts,
      })

      toast.success(
        data.type === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!'
      )
    },
    onError: () => {
      toast.error('Falha ao criar transação')
    },
  })

  return mutation
}
