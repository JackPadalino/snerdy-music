import React, { useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import songType from "../../../types/songType";
import { setReduxSongId, resetReduxSongId } from "../../store/songsSlice";
import "./Music.css";

const Music = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const songs = useAppSelector((state) => state.songs.allSongs);
  const reduxSongId = useAppSelector((state) => state.songs.reduxSongId);

  const checkout = async (
    songId: any,
    songTitle: string,
    songArtist: string
  ) => {
    dispatch(setReduxSongId(songId));
    const body = {
      songId: songId,
      songTitle: songTitle,
      songArtist: songArtist,
    };
    try {
      const response = await axios.post(
        "/api/checkout/create-checkout-session",
        body
      );
      // Redirect the user's browser to the checkout session URL
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  // useEffect(() => {
  //   dispatch(resetSongToBuyId());
  // }, []);

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>Songs for download</h1>
      <ul>
        {songs.map((song: songType) => (
          <li key={song.id}>
            {song.title} - {song.artist}
            {/* <button
              className="downloadButton"
              onClick={() => downloadSong(song.id, song.title)}
            >
              Download
            </button> */}
            <button onClick={() => checkout(song.id, song.title, song.artist)}>
              Buy
            </button>
          </li>
        ))}
      </ul>
      {/* <button onClick={() => checkout()}>Checkout</button> */}
    </div>
  );
};

export default Music;
