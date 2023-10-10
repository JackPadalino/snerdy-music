import React, { useEffect, useState } from "react";
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
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const [hoveredSongId, setHoveredSongId] = useState<string | null>(null);

  const downloadSong = async (
    songId: string,
    userId: string,
    songTitle: string,
    songArtist: string
  ) => {
    try {
      // Send a GET request to the server to download the song
      const response = await axios.get(
        `/api/songs/${songId}/download/${userId}`,
        {
          // Set the response type to blob
          responseType: "blob",
        }
      );
      // Create a Blob URL from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create an <a> element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      // Set the "download" attribute and filename for the download
      link.setAttribute("download", `${songArtist} - ${songTitle}.mp3`); // Set the desired filename
      // Append the <a> element to the DOM and trigger a click event
      document.body.appendChild(link);
      link.click();
      // Cleanup: Remove the <a> element and revoke the Blob URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      dispatch(resetReduxSong());
      dispatch(resetStripeSessionId());
    } catch (error) {
      console.error("Error downloading song:", error);
    }
  };

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
      <ul className="songList">
        {songs.map((song: songType) => (
          <li
            key={song.id}
            onMouseEnter={() => setHoveredSongId(song.id)}
            onMouseLeave={() => setHoveredSongId(null)}
          >
            {song.artist} - {song.title}
            {hoveredSongId === song.id && (
              <button
                className="buyBtn"
                onClick={() =>
                  // checkout(song.id, song.title, song.artist, song.filepath)
                  downloadSong(song.id, userInfo.id, song.title, song.artist)
                }
              >
                buy track
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Music;
