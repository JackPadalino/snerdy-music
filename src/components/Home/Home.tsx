import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { RootState } from "../../store";
import { Login } from "../index";

const Home = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  return (
    <div>
      {userInfo.id && (
        <div>
          <h1>Home!!!!</h1>
          <p>Welcome to Snerdy {userInfo.username}!!</p>
          <p>Here are your songs:</p>
          <ul>
            {userInfo.songs.map((song) => (
              <li key={song.id}>{song.title}</li>
            ))}
          </ul>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      {!userInfo.id && <Login />}
    </div>
  );
};

export default Home;
