import React, { SyntheticEvent, useRef, useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import songsSlice, { resetSongs } from "../../store/songsSlice";
import { RootState } from "../../store";
import { Login } from "../index";

const Home = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { userSongs } = useSelector((state: RootState) => state.songs);
  const song = useRef("");
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
    dispatch(resetSongs());
  };

  const handleSongChange = (e: any) => {
    song.current = e.target.value;
  };

  const uploadFiles = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("song", song.current);
      await axios.post(`/api/songs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      song.current = "";
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
          {/* <form id="form" encType="multipart/form-data" onSubmit={uploadFiles}>
            <div className="input-group">
              <label htmlFor="song">Select file</label>
              <input
                id="song"
                name="song"
                type="file"
                onChange={handleSongChange}
              />
            </div>
            <button className="submit-btn" type="submit">
              Upload
            </button>
          </form> */}
          <form action="/api/songs" method="POST" encType="multipart/form-data">
            <input type="file" name="song" />

            <button type="submit">Upload</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
