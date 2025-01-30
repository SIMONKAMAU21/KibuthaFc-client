import { useMutation, useQuery, useQueryClient } from 'react-query'
import { httpV1 } from '../../../api/axios'


export const useCreateAccount = () => {
  return useMutation(
    async (payload) => {
      const response = await httpV1({
        method: "POST",
        url: "users/add",
        data: payload
      });
      return response.data
    }
  )
}

export const useLoginUser = () => {
  return useMutation(
    async (payload) => {
      const response = await httpV1({
        method: "POST",
        url: "users/login",
        data: payload
      });
      return response.data
    }
  )
}

export const useGetAllUsers = () =>{
  return useQuery('users', async () => {
    const response = await httpV1({
      method: "GET",
      url: "users"
    });
    return response.data

  })
}

export const useUpdateUser = () =>{
  const queryClient = useQueryClient(); // ✅ Get QueryClient instance

  return useMutation(
    async(payload) =>{
      const response = await httpV1({
        method:"PUT",
        url:`user/${payload.id}`,
        data:payload

      });
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users'); // ✅ Refresh users list after update
      }
    }
  )
}

