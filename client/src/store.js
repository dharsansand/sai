import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

  // Mask sensitive data in Redux DevTools
  devTools: {
    // 1. Masks the API response in the Actions log
    actionSanitizer: (action) => {
      if (action.type.includes("api/executeQuery/fulfilled")) {
        return {
          ...action,
          payload: "****** DATA MASKED ******", // Static mask
        };
      }
      return action;
    },

    // 2. Masks the cached data inside the Redux State tree
    stateSanitizer: (state) => {
      if (state[api.reducerPath]) {
        return {
          ...state,
          [api.reducerPath]: {
            ...state[api.reducerPath],
            queries: "****** CACHE MASKED ******", // Static mask
          },
        };
      }
      return state;
    },
  },
});