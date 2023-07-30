import { createSlice } from "@reduxjs/toolkit";

interface songType {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
}

interface userInfoType {
  id: string;
  username: string;
  songs: songType[];
}

interface initialStateType {
  userInfo: userInfoType;
}

const initialState: initialStateType = {
  userInfo: {
    id: "",
    username: "",
    songs: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUser: (state) => {
      state.userInfo = {
        id: "",
        username: "",
        songs: [],
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
