import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (categoryId) => ({
        url: "product",
        
        params: categoryId ? { category: categoryId } : {},
      }),
      providesTags: ["Product"],
    }),
  }),
});


export const { useGetProductsQuery } = productApi;