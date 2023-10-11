import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const path = require("path");
const multer = require("multer");
import { v4 as uuidv4 } from "uuid";
import { Song, User, UserSongs } from "../db";
import { SongModelAttributes } from "../db/models/Song";

router.get(
  "/:songId/download/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const songId = req.params.songId;
      const userId = req.params.userId!;
      const song = await Song.findByPk(songId);
      const user = await User.findByPk(userId);
      if (song && user) {
        await UserSongs.create({
          id: uuidv4(),
          songId: song.id,
          userId: user.id,
        });
        const filePath = path.join(__dirname, "../..", song.filepath);
        res.download(filePath, `${song.title}.mp3`); // Set the desired filename
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

// GET /api/songs - Get all songs from DB
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allSongs: SongModelAttributes[] = await Song.findAll();
    if (!allSongs) {
      res.sendStatus(404);
    } else {
      res.send(allSongs);
    }
  } catch (err) {
    res.sendStatus(404);
    next(err);
  }
});

// Define a custom file filter for mp3 files
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "audio/mpeg") {
    // Check for the correct MIME type for mp3 files
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only mp3 files are allowed."), false); // Reject the file
  }
};

// Uploading files with multer
const storage = multer.diskStorage({
  destination: "./music",
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  preservePath: true,
  storage,
  fileFilter,
});

// extending the Request interface to include 'file' for multer
interface MulterRequest extends Request {
  file: any;
}

router.post(
  "/",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    const documentFile = (req as MulterRequest).file;
    if (documentFile) {
      try {
        const foundUser = await User.findByPk(req.body.userId);
        if (foundUser) {
          const newSong = await Song.create({
            id: uuidv4(),
            title: req.body.title,
            artist: req.body.artist,
            filepath: documentFile.path,
          });
          await UserSongs.create({
            id: uuidv4(),
            userId: foundUser.id,
            songId: newSong.id,
          });
          res.sendStatus(200);
        }
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    }
  }
);

export default router;
