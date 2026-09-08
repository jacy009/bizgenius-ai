const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("BizGenius AI server is running!");
});

app.post("/generate", (req, res) => {
    const { business, contentType } = req.body;

    let message = "";

    if (contentType === "advertisement") {
        message = `🔥 SPECIAL OFFER! 🔥

Looking for quality ${business}?

Get the best ${business} at affordable prices.
✨ Quality products
💰 Affordable prices
📍 Available in Kenya

Order today and enjoy great service!`;
    }

    else if (contentType === "whatsapp") {
        message = `Hello 👋

Are you looking for quality ${business}?

We have great products at affordable prices. 🛍️

📞 Contact us today to place your order.

Thank you for choosing us! ❤️`;
    }

    else if (contentType === "social") {
        message = `✨ Quality ${business} at great prices! ✨

Shop with us today and get amazing products at affordable prices. 🛍️🇰🇪

#Business #Shopping #Kenya #QualityProducts`;
    }

    else if (contentType === "description") {
        message = `${business} — quality you can trust.

Our ${business} is carefully selected to give customers great value, quality and satisfaction.

Order yours today and experience excellent service!`;
    }

    res.json({
        message: message
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`BizGenius AI server running on http://localhost:${PORT}`);
});