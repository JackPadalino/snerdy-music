import db from "./db";
import { Song, User, UserSongs } from ".";
import songType from "../../types/songType";
import userType from "../../types/userType";
import { v4 as uuidv4 } from "uuid";

const users: userType[] = [
  { id: uuidv4(), username: "pada0867", password: "abc123" },
  { id: uuidv4(), username: "modernboheme", password: "abc123" },
];

const songs: songType[] = [
  {
    id: uuidv4(),
    title: "Booty Shake",
    artist: "Beau Didier",
    // bpm: 140,
    // key: "5A",
    filepath: "music/Booty Shake.mp3",
  },
  {
    id: uuidv4(),
    title: "Colour 1",
    artist: "Beau Didier",
    // bpm: 140,
    // key: "5A",
    filepath: "music/Colour 1.mp3",
  },
  // {
  //   title: "Colour 2",
  //   artist: "Beau Didier",
  //   // bpm: 140,
  //   // key: "5A",
  //   filepath: "music/Colour 2.mp3",
  // },
  // {
  //   title: "Colour 3",
  //   artist: "Beau Didier",
  //   // bpm: 140,
  //   // key: "5A",
  //   filepath: "music/Colour 3.mp3",
  // },
  // {
  //   title: "Colour 4",
  //   artist: "Beau Didier",
  //   // bpm: 140,
  //   // key: "5A",
  //   filepath: "music/Colour 4.mp3",
  // },
];

const seed = async () => {
  console.log("Starting seed...");
  await db.sync({ force: true });
  try {
    console.log("Adding songs...");
    const [bootyShakeSong, Colour1Song] = await Promise.all(
      songs.map((song) => Song.create(song))
    );

    console.log("Adding users");
    const [jackPadalino, jasmineHarrison] = await Promise.all(
      users.map((user) => User.create(user))
    );
    console.log("Associating users with songs...");
    const userSongsList = [
      { userId: jackPadalino.id, songId: bootyShakeSong.id },
      { userId: jackPadalino.id, songId: Colour1Song.id },
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
