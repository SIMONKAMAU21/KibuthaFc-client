import { useMutation, useQuery, useQueryClient } from 'react-query'
import { httpV1 } from '../../../api/axios'


export const useCreateAccount = () => {
  return useMutation(
    async (payload) => {
      const response = await httpV1({
        method: "POST",
        url: "users/add",
        data: payload,
       
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


export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload) => {
      const formData = new FormData();
      
      // Append all text fields
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("phone", payload.phone);
      formData.append("role", payload.role);

      // Append image file if it exists
      if (payload.photo) {
        formData.append("photo", {
          uri: payload.photo,
          name: `profile_${Date.now()}.jpg`,
          type: "image/jpeg",
        });
      }

      const response = await httpV1({
        method: "PUT",
        url: `user/${payload.id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users"); // ✅ Refresh users list after update
      },
    }
  );
};

