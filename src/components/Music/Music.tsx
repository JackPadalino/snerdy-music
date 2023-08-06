import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

const Music = () => {
  const token = window.localStorage.getItem("token");
  const songs = useAppSelector((state) => state.songs.allSongs);

  if (!token) return <p>Sorry! Something went wrong!</p>;
  return (
    <div>
      <h1>Songs for download</h1>
      {songs.map((song) => (
        <>
          <ul>
            <li key={song.id}>
              {song.title} - {song.artist}
            </li>
          </ul>
        </>
      ))}
    </div>
  );
};

export default Music;
