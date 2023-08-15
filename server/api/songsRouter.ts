import express, { Request, Response, NextFunction } from "express";
import { Song } from "../db";
import { SongModelAttributes } from "../db/models/Song";
const router = express.Router();
const path = require("path");
const multer = require("multer");

// const multer = require("multer");

// const storage = multer.diskStorage({
//   filename: function (req: any, file: any, cb: any) {
//     cb(null, file.originalname);
//   },
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, path.resolve(__dirname, "../../music/"));
//   },
// });

// const upload = multer({ storage });

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

router.post(
  "/",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      try {
        await Song.create({
          title: req.body.title,
          artist: req.body.artist,
          // bpm: req.body.bpm,
          // key: req.body.key,
          filepath: req.file.path,
        });
        res.sendStatus(200);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    }
  }
);

export default router;
