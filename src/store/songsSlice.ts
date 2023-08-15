import { createSlice } from "@reduxjs/toolkit";
import songType from "../../types/songType";

interface initialStateType {
  allSongs: songType[];
  userSongs: songType[];
}

const initialState: initialStateType = {
  allSongs: [],
  userSongs: [],
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    setSongs: (state, action) => {
      state.userSongs = action.payload;
    },
    resetSongs: (state) => {
      state.userSongs = initialState.userSongs;
    },
  },
});

export const { setAllSongs, setSongs, resetSongs } = songsSlice.actions;
export default songsSlice.reducer;
