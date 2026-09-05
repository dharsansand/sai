import { api } from "./api";
import { decryptData } from "./cryptoHelper";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
 
    getHomeCategory: builder.query({
      query: (params) => {
     
        return {
          url: "category/home",
          params: params,
        };
      },

      transformResponse: (response) => decryptData(response),
      providesTags: ["Category"],
    }),
  }),
});


export const { useGetHomeCategoryQuery } = categoryApi;