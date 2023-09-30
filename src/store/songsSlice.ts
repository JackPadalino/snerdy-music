import { createSlice } from "@reduxjs/toolkit";
import songType from "../../types/songType";

interface initialStateType {
  allSongs: songType[];
  userSongs: songType[];
  reduxSong: songType;
  stripeSessionId: string;
}

const initialState: initialStateType = {
  allSongs: [],
  userSongs: [],
  reduxSong: {
    id: "",
    title: "",
    artist: "",
    filepath: "",
  },
  stripeSessionId: "",
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
    setReduxSong: (state, action) => {
      state.reduxSong = action.payload;
    },
    resetReduxSong: (state) => {
      state.reduxSong = initialState.reduxSong;
    },
    setStripeSessionId: (state, action) => {
      state.stripeSessionId = action.payload;
    },
    resetStripeSessionId: (state) => {
      state.stripeSessionId = initialState.stripeSessionId;
    },
  },
});

export const {
  setAllSongs,
  setSongs,
  resetSongs,
  setReduxSong,
  resetReduxSong,
  setStripeSessionId,
  resetStripeSessionId,
} = songsSlice.actions;
export default songsSlice.reducer;
