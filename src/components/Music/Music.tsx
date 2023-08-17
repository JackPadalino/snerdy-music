import React from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./Music.css";

const Music = () => {
  const token = window.localStorage.getItem("token");
  const songs = useAppSelector((state) => state.songs.allSongs);

  const downloadSong = async (songId: any, songTitle: string) => {
    try {
      // Send a GET request to the server to download the song
      const response = await axios.get(`/api/songs/${songId}/download`, {
        responseType: "blob", // Set the response type to blob
      });
      // Create a Blob URL from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create an <a> element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      // Set the "download" attribute and filename for the download
      link.setAttribute("download", `${songTitle}.mp3`); // Set the desired filename
      // Append the <a> element to the DOM and trigger a click event
      document.body.appendChild(link);
      link.click();
      // Cleanup: Remove the <a> element and revoke the Blob URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading song:", error);
    }
  };

  const checkout = async (
    songId: any,
    songTitle: string,
    songArtist: string
  ) => {
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
      console.log(response.data);
      // Redirect the user's browser to the checkout session URL
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>Songs for download</h1>
      <ul>
        {songs.map((song: any) => (
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
