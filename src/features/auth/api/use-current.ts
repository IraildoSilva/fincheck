// import { client } from '@/lib/rpc'
// import { useQuery } from '@tanstack/react-query'
// import { QUERY_KEYS } from '../constants'
// import { sleep } from '@/lib/utils'

// export function useCurrent() {
//   const query = useQuery({
//     queryKey: QUERY_KEYS.current,
//     queryFn: async () => {
//       await sleep(300)
//       const response = await client.api.auth.current.$get()

//       if (!response.ok) {
//         return null
//       }

//       const { data } = await response.json()

//       return data
//     },
//   })

//   return query
// }
