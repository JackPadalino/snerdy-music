import React, { useEffect } from "react";
import axios from "axios";
import { setUser } from "../../store/userSlice";

import { useAppDispatch } from "../../store/hooks";
import RouterComponent from "../../components/RouterComponent";
//import "./style.css";

const App = () => {
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    checkForUser();
  }, []);

  return (
    <div className="component">
      <RouterComponent />
    </div>
  );
};

export default App;
