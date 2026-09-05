import { api } from "./api";
import { decryptData } from "./cryptoHelper";

export const meApi = api.injectEndpoints({
  endpoints: (builder) => ({
   
    getMe: builder.query({
      query: () => "users/me", 

   
      transformResponse: (response) => decryptData(response),

      providesTags: ["Me"],
    }),
  }),
});

export const { useGetMeQuery } = meApi;