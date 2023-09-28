import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { setAllSongs, setSongs } from "../../store/songsSlice";
import axios from "axios";

const Login = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    setCredentials({
      ...credentials,
      [event.target!.name]: event.target!.value,
    });
  };

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      //fetch the user
      const authResponse = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      //fetch all songs
      const songResponse = await axios.get("/api/songs");
      dispatch(setAllSongs(songResponse.data));
      //fetch all songs associated with the logged in user
      const userResponse = await axios.get(
        `/api/users/${authResponse.data.id}`
      );
      dispatch(
        setUser({
          id: userResponse.data.id,
          username: userResponse.data.username,
        })
      );
      dispatch(setSongs(userResponse.data.songs));
      navigate("/");
    }
  };

  const attemptLogin = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post("/api/auth", credentials);
    const token = response.data;
    window.localStorage.setItem("token", token);
    loginWithToken();
  };

  return (
    <div>
      {!token && (
        <>
          <h1>Login</h1>
          <form onSubmit={attemptLogin}>
            <input
              placeholder="username"
              value={credentials.username}
              name="username"
              onChange={onChange}
            />
            <input
              placeholder="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <button>Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
