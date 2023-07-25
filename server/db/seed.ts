import db from "./db";
import { Song, User } from ".";

// All Users
interface user {
  username: string;
  password: string;
}

const users: user[] = [{ username: "pada0867", password: "hatchet278" }];

// All Songs
interface song {
  title: string;
  bpm: number;
  key: string;
}

const songs: song[] = [
  { title: "Quantum", bpm: 132, key: "5A" },
  { title: "Headrush", bpm: 130, key: "6B" },
  { title: "Go With the Flow", bpm: 145, key: "5A" },
];

const seed = async () => {
  console.log("Starting seed...");
  await db.sync({ force: true });
  try {
    console.log("adding songs");
    const [quantumSong, headrushSong, goWithTheFlowSong] = await Promise.all(
      songs.map((song) => Song.create(song))
    );

    console.log("adding users");
    const [jackPadalino] = await Promise.all(
      users.map((user) => User.create(user))
    );
  } catch (err) {
    console.log(err);
  }

  console.log("Seed complete!");
};

seed();
