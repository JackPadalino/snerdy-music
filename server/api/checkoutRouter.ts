import express, { Request, Response, NextFunction } from "express";
import { Song } from "../db";
const router = express.Router();
const path = require("path");
import dotenv from "dotenv";
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.post(
  "/create-checkout-session",
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${req.body.songTitle} - ${req.body.songArtist}.mp3`,
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.SERVER_DOMAIN}/checkout?success=true`,
      cancel_url: `${process.env.SERVER_DOMAIN}/checkout?success=false`,
    });
    // res.redirect(303, session.url);
    res.json({ url: session.url });
  }
);

export default router;
