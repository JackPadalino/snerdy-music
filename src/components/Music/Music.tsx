import React, { useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import songType from "../../../types/songType";
import {
  setReduxSongId,
  resetReduxSongId,
  setStripeSessionId,
  resetStripeSessionId,
} from "../../store/songsSlice";
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
    const body = {
      // songId: songId,
      songTitle: songTitle,
      songArtist: songArtist,
    };
    try {
      const response = await axios.post(
        "/api/checkout/create-checkout-session"
        // body
      );
      // Redirect the user's browser to the checkout session URL
      // window.location.href = response.data.url;
      dispatch(setReduxSongId(songId));
      dispatch(setStripeSessionId(response.data.sessionId));
      console.log({
        "here's what we're sending to the redux strore":
          response.data.sessionId,
      });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    dispatch(resetReduxSongId());
  }, []);

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
