import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { QUERY_KEYS } from "../constants";

type Route = typeof client.api['bank-accounts']['$post']

type RequestType = InferRequestType<Route>
type ResponseType = InferResponseType<Route>

export function useCreateBankAccount() {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ json }) => {
			const response = await client.api['bank-accounts']['$post']({ json })

			if(!response.ok) {
				throw new Error('Failed to create bank account')
			}

			const data = await response.json()

			return data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bankAccounts })
			toast.success('Conta cadastrada com sucesso!')
		},
		onError: () => {
			toast.error('Erro ao cadastrar conta!')
		}
 	})

	return mutation
}