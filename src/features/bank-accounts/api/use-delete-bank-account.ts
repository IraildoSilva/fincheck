import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { QUERY_KEYS } from '../constants'
import { toast } from 'sonner'

type Route = (typeof client.api)['bank-accounts'][':bankAccountId']['$delete']

type RequestType = InferRequestType<Route>
type ResponseType = InferResponseType<Route>

export function useUpdateBankAccount() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api['bank-accounts'][':bankAccountId']['$delete']({
        param,
      })

			if(!response.ok) {
				throw new Error('Failed to delete bank account')
			}

			const data = await response.json()

			return data
    },
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bankAccounts })
			toast.success('Conta deletada com sucesso!')
		},
		onError: () => {
			toast.error('Erro ao deletar conta!')
		}
  })

	return mutation
}
