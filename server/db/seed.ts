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
    title: "Booty Shake",
    artist: "Beau Didier",
    // bpm: 140,
    // key: "5A",
    filepath: "music/Booty Shake.mp3",
  },
  {
    title: "Colour 1",
    artist: "Beau Didier",
    // bpm: 140,
    // key: "5A",
    filepath: "music/Colour 1.mp3",
  },
  {
    title: "Colour 2",
    artist: "Beau Didier",
    // bpm: 140,
    // key: "5A",
    filepath: "music/Colour 2.mp3",
  },
  {
    title: "Colour 3",
    artist: "Beau Didier",
    // bpm: 140,
    // key: "5A",
    filepath: "music/Colour 3.mp3",
  },
  {
    title: "Colour 4",
    artist: "Beau Didier",
    // bpm: 140,
    // key: "5A",
    filepath: "music/Colour 4.mp3",
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
