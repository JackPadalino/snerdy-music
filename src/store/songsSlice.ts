import { createSlice } from "@reduxjs/toolkit";
import songType from "../../types/songType";

interface initialStateType {
  allSongs: songType[];
  userSongs: songType[];
  reduxSongId: string;
}

const initialState: initialStateType = {
  allSongs: [],
  userSongs: [],
  reduxSongId: "",
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
    setReduxSongId: (state, action) => {
      console.log("set redux song id function called");
      state.reduxSongId = action.payload;
      console.log(state.reduxSongId);
    },
    resetReduxSongId: (state) => {
      console.log("reset redux song id function called");
      state.reduxSongId = initialState.reduxSongId;
      console.log(state.reduxSongId);
    },
  },
});

export const {
  setAllSongs,
  setSongs,
  resetSongs,
  setReduxSongId,
  resetReduxSongId,
} = songsSlice.actions;
export default songsSlice.reducer;
