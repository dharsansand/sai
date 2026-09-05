// src/services/bannerApi.js
import { api } from "./api";
import { decryptData } from "./cryptoHelper";


export const bannerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHomeBanners: builder.query({
      query: () => "banner/home",
      
      
      transformResponse: (response) => decryptData(response),

      providesTags: ["Banner"],
    }),
  }),
});

export const { useGetHomeBannersQuery } = bannerApi;