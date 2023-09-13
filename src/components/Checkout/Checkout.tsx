import React, { useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setReduxSongId, resetReduxSongId } from "../../store/songsSlice";

interface CheckoutProps {
  successQueryParam: string | null;
  songId: string | null;
}

const Checkout: React.FC<CheckoutProps> = ({ successQueryParam, songId }) => {
  const token = window.localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const reduxSongId = useAppSelector((state) => state.songs.reduxSongId);

  const downloadSong = async (songId: any) => {
    if (successQueryParam === "true") {
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
        dispatch(resetReduxSongId());
      } catch (error) {
        console.error("Error downloading song:", error);
      }
    }
  };

  if (!token) return <p>Sorry! Something went wrong!</p>;

  useEffect(() => {
    reduxSongId === songId
      ? downloadSong(songId)
      : dispatch(resetReduxSongId());
  }, []);

  return (
    <div>
      <h1>
        {successQueryParam === "true"
          ? "Payment successful. Enjoy your new tunes!"
          : "Oops! Something went wrong! Payment failed."}
      </h1>
    </div>
  );
};

export default Checkout;
