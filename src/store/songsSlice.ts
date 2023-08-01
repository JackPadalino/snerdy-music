import { createSlice } from "@reduxjs/toolkit";
import songType from "../../types/songType";

interface initialStateType {
  userSongs: songType[];
}

const initialState: initialStateType = {
  userSongs: [],
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.userSongs = action.payload;
    },
    resetSongs: (state) => {
      state.userSongs = initialState.userSongs;
    },
  },
});

export const { setSongs, resetSongs } = songsSlice.actions;
export default songsSlice.reducer;
