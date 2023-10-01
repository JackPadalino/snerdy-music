import React, { useRef } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAllSongs } from "../../store/songsSlice";

const Home = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const title = useRef("");
  const artist = useRef("");
  const file = useRef("");

  const handleTitleChange = (e: any) => {
    title.current = e.target.value;
  };

  const handleArtistChange = (e: any) => {
    artist.current = e.target.value;
  };

  const handleFileChange = (e: any) => {
    file.current = e.target.files[0];
  };

  const uploadFiles = async (e: any) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("userId", userInfo.id);
      body.append("title", title.current);
      body.append("artist", artist.current);
      body.append("file", file.current);
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
      </div>
    </div>
  );
};

export default Home;
