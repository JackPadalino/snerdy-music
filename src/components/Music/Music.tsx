import React from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./Music.css";

const Music = () => {
  const token = window.localStorage.getItem("token");
  const songs = useAppSelector((state) => state.songs.allSongs);

  const downloadSong = async (songId: any) => {
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
      link.setAttribute("download", "song.mp3"); // Set the desired filename
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

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>Songs for download</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist}
            <button
              className="downloadButton"
              onClick={() => downloadSong(song.id)}
            >
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Music;