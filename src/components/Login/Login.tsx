import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setSongs } from "../../store/userSlice";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
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
      const authResponse = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      const userResponse = await axios.get(
        `/api/users/${authResponse.data.id}`
      );
      console.log(userResponse.data);
      dispatch(setUser(userResponse.data));
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
      <h2>Login</h2>
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
    </div>
  );
};

export default Login;
