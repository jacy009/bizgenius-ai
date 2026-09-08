const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BizGenius AI server is running!");
});

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
    case "advertisement":
      message = `🔥 SPECIAL OFFER! 🔥

Looking for quality ${biz}?

Get the best ${biz} at affordable prices.
✨ Quality products
💰 Affordable prices
📍 Available in Kenya

Order today and enjoy great service!`;
      break;

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
