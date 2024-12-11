import { client } from '@/lib/rpc'
import { useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

type Route = typeof client.api.transactions.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useCreateTransaction() {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.transactions.$post({ json })

      if (!response.ok) {
        throw new Error('Failed to create transaction')
      }

      const data = await response.json()

      return data
    },
  })

  return mutation
}
