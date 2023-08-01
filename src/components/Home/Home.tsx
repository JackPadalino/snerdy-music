import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { resetSongs } from "../../store/songsSlice";
import { RootState } from "../../store";
import { Login } from "../index";

const Home = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { userSongs } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    dispatch(resetSongs());
  };

  return (
    <div>
      {!userInfo.id ? (
        <Login />
      ) : (
        <div>
          <h1>Home!!!!</h1>
          <p>Welcome to Snerdy {userInfo.username}!!</p>
          <p>Here are your songs:</p>
          <ul>
            {userSongs.map((song) => (
              <li key={song.id}>{song.title}</li>
            ))}
          </ul>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
