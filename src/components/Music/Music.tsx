import React, { useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import songType from "../../../types/songType";
import {
  setReduxSong,
  resetReduxSong,
  setStripeSessionId,
  resetStripeSessionId,
} from "../../store/songsSlice";
import "./Music.css";

const Music = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const songs = useAppSelector((state) => state.songs.allSongs);

  const checkout = async (
    songId: string,
    songTitle: string,
    songArtist: string,
    songFilepath: string
  ) => {
    const body = {
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
      dispatch(
        setReduxSong({
          id: songId,
          title: songTitle,
          artist: songArtist,
          filepath: songFilepath,
        })
      );
      dispatch(setStripeSessionId(response.data.sessionId));
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    dispatch(resetReduxSong());
    dispatch(resetStripeSessionId());
  }, []);

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>Songs for download</h1>
      <ul>
        {songs.map((song: songType) => (
          <li key={song.id}>
            {song.artist} - {song.title}
            <button
              onClick={() =>
                checkout(song.id, song.title, song.artist, song.filepath)
              }
            >
              Buy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Music;
