import express, { Request, Response, NextFunction } from "express";
import { Song } from "../db";
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

// router.post(
//   "/purchase",
//   bodyParser.raw({ type: "application/json" }),
//   (request, response) => {
//     const payload = request.body;
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         payload,
//         sig,
//         process.env.STRIPE_PURCHASING_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       return response.status(400).send(`Webhook Error: ${err}`);
//     }

//     response.status(200).end();
//   }
// );

// const fulfillOrder = (lineItems: any) => {
//   // TODO: fill me in
//   console.log("Fulfilling order", lineItems);
// };

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
      const lineItems = sessionWithLineItems.line_items;

      // Fulfill the purchase...
      // fulfillOrder(lineItems);
      // Now that the checkout session has been verified as completed, you can set what happens next.
      // In this case, we want to send the song to the user!
    }

    response.status(200).end();
  }
);

export default router;
