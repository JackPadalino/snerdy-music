import express, { Request, Response, NextFunction } from "express";
import { Song } from "../db";
const router = express.Router();
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.get(
  "/create-checkout-session",
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await stripe.checkout.sessions.create({
      // would normally pass an array of items from req.body into the array for line items
      // here we will hard code in a single item that costs $1.00
      line_items: [
        // {
        //   price: 100,
        //   quantity: 1,
        // },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "A great song!",
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

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         const storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInCents,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.CLIENT_URL}/success.html`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
//     });
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

export default router;
