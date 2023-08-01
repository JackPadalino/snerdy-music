import db from "./db";
import { Song, User, UserSongs } from ".";
import songType from "../../types/songType";
import userType from "../../types/userType";

const users: userType[] = [
  { username: "pada0867", password: "abc123" },
  { username: "modernboheme", password: "abc123" },
];

const songs: songType[] = [
  {
    title: "Quantum",
    artist: "Filterheadz",
    bpm: 132,
    key: "5A",
  },
  { title: "Headrush", artist: "Anthony Parasole", bpm: 130, key: "6B" },
  { title: "Go With the Flow", artist: "Narciss", bpm: 145, key: "5A" },
  {
    title: "To the Moon and Back",
    artist: "Elad Magdasi",
    bpm: 140,
    key: "9B",
  },
];

const seed = async () => {
  console.log("Starting seed...");
  await db.sync({ force: true });
  try {
    console.log("Adding songs...");
    const [quantumSong, headrushSong, goWithTheFlowSong, toTheMoonAndBackSong] =
      await Promise.all(songs.map((song) => Song.create(song)));

    console.log("Adding users");
    const [jackPadalino, jasmineHarrison] = await Promise.all(
      users.map((user) => User.create(user))
    );
    console.log("Associating users with songs...");
    const userSongsList = [
      { userId: jackPadalino.id, songId: quantumSong.id },
      { userId: jackPadalino.id, songId: headrushSong.id },
      { userId: jackPadalino.id, songId: toTheMoonAndBackSong.id },
      { userId: jasmineHarrison.id, songId: goWithTheFlowSong.id },
      { userId: jasmineHarrison.id, songId: quantumSong.id },
    ];
    await Promise.all(
      userSongsList.map((userSong) => UserSongs.create(userSong))
    );
  } catch (err) {
    console.log(err);
  }

  console.log("Seed complete!");
};

seed();
