import express from "express";
const router = express.Router();
import authRouter from "./auth";
import songsRouter from "./songsRouter";
import userRouter from "./userRouter";
import checkoutRouter from "./checkoutRouter";

router.use("/auth", authRouter);
router.use("/songs", songsRouter);
router.use("/users", userRouter);
router.use("/checkout", checkoutRouter);

export default router;
