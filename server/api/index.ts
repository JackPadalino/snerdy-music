import express from "express";
const router = express.Router();
import authRouter from "./auth";
import songsRouter from "./songsRouter";

router.use("/auth", authRouter);
router.use("/songs", songsRouter);

export default router;
