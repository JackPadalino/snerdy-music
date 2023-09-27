import React, { SyntheticEvent, useRef, useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { resetUser } from "../../store/userSlice";
import { setAllSongs, resetSongs } from "../../store/songsSlice";
import { RootState } from "../../store";

const Home = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const title = useRef("");
  const artist = useRef("");
  // const bpm = useRef(0);
  const key = useRef("");
  const file = useRef("");

  const getUserId = (token: any) => {
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userObj = JSON.parse(rawPayload);
    const userId = userObj.id;
    return userId;
  };

  const handleTitleChange = (e: any) => {
    title.current = e.target.value;
  };

  const handleArtistChange = (e: any) => {
    artist.current = e.target.value;
  };

  // const handleBpmChange = (e: any) => {
  //   const parsedBpm = parseInt(e.target.value, 10);
  //   bpm.current = isNaN(parsedBpm) ? 0 : parsedBpm;
  // };

  const handleKeyChange = (e: any) => {
    key.current = e.target.value;
  };

  const handleFileChange = (e: any) => {
    file.current = e.target.files[0];
  };

  const uploadFiles = async (e: any) => {
    e.preventDefault();
    try {
      const body = new FormData();
      const userId = getUserId(token);

      // const body = {
      //   title: title.current,
      //   artist: artist.current,
      //   bpm: bpm.current,
      //   key: key.current,
      //   file: file.current,
      // };
      body.append("userId", userId);
      body.append("title", title.current);
      body.append("artist", artist.current);
      // body.append("bpm", bpm.current);
      // body.append("key", key.current);
      body.append("file", file.current);
      // await axios.post(`/api/songs`, body, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      await axios.post(`/api/songs`, body);
      file.current = "";
      //fetch all songs
      const songResponse = await axios.get("/api/songs");
      dispatch(setAllSongs(songResponse.data));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>Upload music</h1>
      <div>
        <form id="form" onSubmit={uploadFiles} encType="multipart/form-data">
          <div className="input-group">
            <label htmlFor="title">Song title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleTitleChange}
            />
            <label htmlFor="artist">Artist</label>
            <input
              id="artist"
              name="artist"
              type="text"
              onChange={handleArtistChange}
            />
            {/* <label htmlFor="bpm">BPM</label>
              <input
                id="bpm"
                name="bpm"
                type="number"
                onChange={handleBpmChange}
              /> */}
            {/* <label htmlFor="key">Key</label>
              <input
                id="key"
                name="key"
                type="text"
                onChange={handleKeyChange}
              /> */}
            <label htmlFor="file">Select file</label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <button className="submit-btn" type="submit">
            Upload
          </button>
        </form>
        {/* <form action="/api/songs" method="POST" encType="multipart/form-data">
            <input type="file" name="song" />

            <button type="submit">Upload</button>
          </form> */}
      </div>
    </div>
  );
};

export default Home;
