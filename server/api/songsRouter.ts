import express, { Request, Response, NextFunction } from "express";
import { Song } from "../db";
import { SongModelAttributes } from "../db/models/Song";
const router = express.Router();

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

export default router;
