import { api } from "./api";
import { decryptData } from "./cryptoHelper";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (categoryId) => ({
        url: "product",
        
        params: categoryId ? { category: categoryId } : {},
      }),
      
            transformResponse: (response) => decryptData(response),
      providesTags: ["Product"],
    }),
  }),
});


export const { useGetProductsQuery } = productApi;