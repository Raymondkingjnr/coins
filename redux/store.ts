import { configureStore } from "@reduxjs/toolkit";
import coinReducers from "./service/coins";

const Makerstore = () => {
  return configureStore({
    reducer: {
      coins: coinReducers,
    },
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = Makerstore();
