import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./features/menu-slice";

export const store = configureStore({
  reducer: {
    menu: menuReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisPatch = typeof store.dispatch;
