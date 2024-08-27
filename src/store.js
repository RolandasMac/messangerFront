import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { todoApi } from "./reducers/todo";
import { authApi } from "./reducers/auth";
import authReducer from "./reducers/authSlice";
import allUsersReducer from "./reducers/allUsersSlice";
import oneConvReducer from "./reducers/conversations/oneConvSlice";
import oneUserReducer from "./reducers/oneUserSlice";
import convListReducer from "./reducers/conversations/convListSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [todoApi.reducerPath]: todoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    user: authReducer,
    allUsers: allUsersReducer,
    oneConv: oneConvReducer,
    oneUser: oneUserReducer,
    convList: convListReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware, authApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
