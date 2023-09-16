import { Link, useNavigate } from "react-router-dom";
import React, { SyntheticEvent, useRef, useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import songsSlice, { resetSongs } from "../../store/songsSlice";
import { RootState } from "../../store";
import { Login } from "../index";
import "./Nav.css";

const Nav = () => {
  const token = window.localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    dispatch(resetSongs());
    navigate("/");
  };

  return (
    <div id="Nav-div">
      {token && (
        <div>
          {/* <Link to="/">Home</Link> */}
          <Link to="/upload">Upload</Link>
          <Link to="/music">Music</Link>
          {/* <Link to="/library">My Library</Link> */}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Nav;
