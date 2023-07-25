import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { RootState } from "../../store";
import { Login } from "../index";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  return (
    <div>
      {user.id && (
        <div>
          <h1>Home!!!!</h1>
          <p>Welcome to Snerdy {user.username}!!</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      {!user.id && <Login />}
    </div>
  );
};

export default Home;
