import { configureStore } from "@reduxjs/toolkit";
import cart from "./features/cart";
import user from "./features/user";

export const rootStore = configureStore({
  reducer: {
    cart,
    user
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;