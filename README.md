### Testing purchases with NGROK

- Used the ngrok tool to expose localhost to the public. Needed this to test Stripe's purchasing webhooks
- To use ngrok:
  - Cd into repo directory
  - Run command './grok http 5173' (or use whatever port your server is running on) to start ngrok
  - Copy/paste the newly generated ngrok URL into the stripe registered webhook dashboard for purchases
  - Stripe will be monitoring your account for events like purchases. When a user hits "pay" on your checkout page, stripe will redirect to a registered webhook. In this case, we have a "purchase" webook. Without ngrok running, stripe cannot redirect to your localhost. When in production, change this url to be 'https://snerdymusic.com/api/checkout/purchases'
