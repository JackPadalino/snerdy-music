import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { RootState } from "../../store";
import { Login } from "../index";
import songsSlice from "../../store/songsSlice";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  const displayUserInfo = () => {
    console.log("displaying user songs");
    console.log(user.songs);
  };

  useEffect(() => {
    displayUserInfo();
  }, []);

  return (
    <div>
      {user.id && (
        <div>
          <h1>Home!!!!</h1>
          <p>Welcome to Snerdy {user.username}!!</p>
          {/* {user.songs.map((song) => {
            <p>{song.title}</p>;
          })} */}
          <button onClick={logout}>Logout</button>
        </div>
      )}
      {!user.id && <Login />}
    </div>
  );
};

export default Home;
