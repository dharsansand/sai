import { api } from "./api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
 
    getHomeCategory: builder.query({
      query: (params) => {
        const limit = params?.limit || params || 4;
        return {
          url: "category/home",
          params: { limit },
        };
      },
      providesTags: ["Category"],
    }),
  }),
});


export const { useGetHomeCategoryQuery } = categoryApi;