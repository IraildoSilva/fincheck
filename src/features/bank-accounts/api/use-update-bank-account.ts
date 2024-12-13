import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { QUERY_KEYS } from '../constants'
import { toast } from 'sonner'

type Route = (typeof client.api)['bank-accounts'][':bankAccountId']['$put']

type RequestType = InferRequestType<Route>
type ResponseType = InferResponseType<Route>

export function useUpdateBankAccount() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api['bank-accounts'][':bankAccountId']['$put']({
        json,
        param,
      })

			if(!response.ok) {
				throw new Error('Failed to update bank account')
			}

			const data = await response.json()

			return data
    },
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bankAccounts })
			toast.success('Conta editada com sucesso!')
		},
		onError: () => {
			toast.error('Ocorreu um erro ao editar conta!')
		}
  })

	return mutation
}
