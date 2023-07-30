import { createSlice } from "@reduxjs/toolkit";
import userType from "../../types/userType";

interface initialStateType {
  userInfo: userType;
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
