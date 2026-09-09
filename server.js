const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

// Health check for load balancers / uptime monitoring
app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.post("/generate", (req, res) => {
  const { business, contentType } = req.body || {};

  if (!business || typeof business !== "string" || !business.trim()) {
    return res.status(400).json({ error: "`business` is required and must be a non-empty string." });
  }

  if (!contentType || typeof contentType !== "string") {
    return res.status(400).json({ error: "`contentType` is required and must be a string (e.g. 'advertisement', 'whatsapp', 'social', 'description')." });
  }

  const biz = business.trim();
  let message = "";

  switch (contentType) {
    if (contentType === "advertisement") {
    message = `👜✨ ${business.toUpperCase()} — STYLE YOU'LL LOVE! ✨👜

Looking for quality ${business} at an affordable price?

We've got you covered! ❤️

✅ Quality products
✅ Stylish and attractive designs
✅ Affordable prices
✅ Great customer service

📲 Order yours today and give your style an upgrade!

🔥 Don't miss out — shop with us today! 🔥`;
}

    case "whatsapp":
      message = `Hello 👋

Are you looking for quality ${biz}?

We have great products at affordable prices. 🛍️

📞 Contact us today to place your order.

Thank you for choosing us! ❤️`;
      break;

    case "social":
      message = `✨ Quality ${biz} at great prices! ✨

Shop with us today and get amazing products at affordable prices. 🛍️🇰🇪

#Business #Shopping #Kenya #QualityProducts`;
      break;

    case "description":
      message = `${biz} — quality you can trust.

Our ${biz} is carefully selected to give customers great value, quality and satisfaction.

Order yours today and experience excellent service!`;
      break;

    case "email":
      message = `Subject: Affordable ${biz} — Order Today\n\nHello,\n\nWe wanted to let you know about our ${biz} — high quality at prices you'll love. Reply to this message or call us to place an order.\n\nBest regards,\nYour ${biz} team`;
      break;

    default:
      return res.status(400).json({ error: `Unsupported contentType: ${contentType}` });
  }

  res.json({ message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BizGenius AI server running on http://localhost:${PORT}`);
});
