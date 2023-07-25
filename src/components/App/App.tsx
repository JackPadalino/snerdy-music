import React, { useEffect } from "react";
import axios from "axios";
import { setUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import RouterComponent from "../../components/RouterComponent";
import { setSongs } from "../../store/songsSlice";
//import "./style.css";

const App = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  // Here we are checking to see if a user is already logged in upon refresh
  // If a token is present in local storage, we keep the user logged in
  const checkForUser = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data));
    }
  };

  const fetchSongs = async () => {
    const response = await axios.get("/api/songs");
    dispatch(setSongs(response.data));
  };

  useEffect(() => {
    checkForUser();
    fetchSongs();
  }, []);

  return (
    <div className="component">
      <RouterComponent />
    </div>
  );
};

export default App;
