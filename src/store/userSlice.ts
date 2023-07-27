import { createSlice } from "@reduxjs/toolkit";

interface songType {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
}

interface songListType {
  songs: songType[];
}

interface userType {
  id: string;
  username: string;
}

interface initialStateType {
  user: userType;
  songsList: songType;
}

const initialState: initialStateType = {
  user: {
    id: "",
    username: "",
  },
  songsList: {
    songs: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSongs: (state, action) => {
      state.user.songs = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        username: "",
        songs: [],
      };
    },
  },
});

export const { setUser, setSongs, resetUser } = userSlice.actions;
export default userSlice.reducer;
