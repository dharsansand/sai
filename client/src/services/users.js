import { api } from "./api";
import { decryptData } from "./cryptoHelper";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
  
    getUsers: builder.query({
      query: () => "users", 

      transformResponse: (response) => decryptData(response),

      providesTags: ["Users"],
    }),
  }),
});


export const { useGetUsersQuery } = userApi;