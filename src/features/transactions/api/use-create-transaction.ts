// import { InferRequestType, InferResponseType } from 'hono'
// import { client } from '@/lib/rpc'
// import { useMutation } from '@tanstack/react-query'

// type Route = typeof client.api.transactions.$post

// type RequestType = InferRequestType<Route>
// type ResponseType = InferResponseType<Route>

// export function useCreateTransaction() {
//   const mutation = useMutation<ResponseType, Error, RequestType>({
//     mutationFn: async ({ json }) => {
//       const response = await client.api.transactions.$post({ json })

//       if (!response.ok) {
//         return null
//       }

//       return await response.json()
//     },
//   })

//   return mutation
// }
