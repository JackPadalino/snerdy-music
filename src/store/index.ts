import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import songsReducer from "./songsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    songs: songsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
