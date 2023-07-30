import { createSlice } from "@reduxjs/toolkit";

interface songType {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
}

// interface songListType {
//   songs: songType[];
// }

interface userInfoType {
  id: string;
  username: string;
  songs: songType[];
}

interface initialStateType {
  userInfo: userInfoType;
  // songsList: songListType;
}

const initialState: initialStateType = {
  userInfo: {
    id: "",
    username: "",
    songs: [],
  },
  // songsList: {
  //   songs: [],
  // },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    // setSongs: (state, action) => {
    //   state.songsList.songs = action.payload;
    // },
    resetUser: (state) => {
      state.userInfo = {
        id: "",
        username: "",
        songs: [],
      };
    },
    // resetSongs: (state) => {
    //   state.songsList.songs = [];
    // },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
