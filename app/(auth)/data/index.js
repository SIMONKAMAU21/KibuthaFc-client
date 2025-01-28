import { useMutation, useQuery } from 'react-query'
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



