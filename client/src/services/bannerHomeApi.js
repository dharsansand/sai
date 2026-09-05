import { api } from "./api";
import CryptoJS from "crypto-js";

const SECRET_KEY = "my-secret-key-123"; 

export const bannerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHomeBanners: builder.query({
      query: () => "banner/home",


      transformResponse: (response) => {
        try {
          if (!response?.data) return [];
          
          const bytes = CryptoJS.AES.decrypt(response.data, SECRET_KEY);
          const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

          return Array.isArray(decryptedData) ? decryptedData : [];
        } catch (error) {
          console.error("Banner decryption error:", error);
          return [];
        }
      },

      providesTags: ["Banner"],
    }),
  }),
});

export const { useGetHomeBannersQuery } = bannerApi;