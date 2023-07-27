import express, { Request, Response, NextFunction } from "express";
import { User, Song } from "../db";
const router = express.Router();

// GET /api/users/userId - Get all songs associated with a particular user
router.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findByPk(req.params.userId, {
        include: [Song],
      });
      res.send(user);
    } catch (err) {
      res.sendStatus(404);
      next(err);
    }
  }
);

export default router;
