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
    title: "Jungle Fever",
    artist: "Ned Bennett",
    filepath: "music/Jungle Fever.mp3",
  },
  {
    id: uuidv4(),
    title: "Temper",
    artist: "CRTB",
    filepath: "music/Temper.mp3",
  },
  {
    id: uuidv4(),
    title: "Symphony",
    artist: "SDB",
    filepath: "music/Symphony.mp3",
  },
];

const seed = async () => {
  console.log("Starting seed...");
  await db.sync({ force: true });
  try {
    console.log("Adding songs...");
    const [bootyShakeSong, colour1Song, symphonySong] = await Promise.all(
      songs.map((song) => Song.create(song))
    );

    console.log("Adding users");
    const [jackPadalino, jasmineHarrison] = await Promise.all(
      users.map((user) => User.create(user))
    );
    // console.log("Associating users with songs...");
    // const userSongsList = [
    //   { id: uuidv4(), userId: jackPadalino.id, songId: bootyShakeSong.id },
    //   { id: uuidv4(), userId: jackPadalino.id, songId: colour1Song.id },
    //   { id: uuidv4(), userId: jasmineHarrison.id, songId: symphonySong.id },
    // ];
    // await Promise.all(
    //   userSongsList.map((userSong) => UserSongs.create(userSong))
    // );
  } catch (err) {
    console.log(err);
  }

  console.log("Seed complete!");
};

seed();
