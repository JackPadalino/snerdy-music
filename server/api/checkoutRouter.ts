import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const path = require("path");
import dotenv from "dotenv";
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
// Using body parser for the purchasing and fulfillment endpoints
const bodyParser = require("body-parser");

router.post(
  "/create-checkout-session",
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${req.body.songArtist} - ${req.body.songTitle}.mp3`,
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        song: req.body.songTitle,
        artist: req.body.songArtist,
      },
      mode: "payment",
      success_url: `${process.env.SERVER_DOMAIN}/checkout?success=true`,
      cancel_url: `${process.env.SERVER_DOMAIN}/checkout?success=false`,
    });
    res.json({
      sessionId: session.id,
      url: session.url,
    });
  }
);

router.post(
  "/purchase",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_PURCHASING_WEBHOOK_SECRET
      );
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
    }
    console.log({ "Here is the event": event });
    response.status(200).end();
  }
);

export default router;
