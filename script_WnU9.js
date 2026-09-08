async function generateContent() {
    const business = document.getElementById("business").value;
    const contentType = document.getElementById("contentType").value;
    const result = document.getElementById("result");

    if (business.trim() === "") {
        result.innerHTML = "Please enter what your business sells.";
        return;
    }

    result.innerHTML = "⏳ Creating your content...";

    try {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                business: business,
                contentType: contentType
            })
        });

        const data = await response.json();

        result.innerHTML = data.message;

    } catch (error) {
        result.innerHTML =
            "❌ Could not connect to BizGenius AI server.";
        console.error(error);
    }
}


function generateBusinessIdeas() {

    const budgetText = document.getElementById("budget").value;
    const interest = document.getElementById("interest").value
        .toLowerCase()
        .trim();

    const result = document.getElementById("businessIdeasResult");

    if (budgetText.trim() === "" || interest === "") {
        result.innerHTML =
            "Please enter your budget and business interest.";
        return;
    }

    const budget = parseInt(
        budgetText.replace(/[^0-9]/g, "")
    );

    if (isNaN(budget)) {
        result.innerHTML =
            "Please enter a valid budget, for example KSh 20,000.";
        return;
    }

    let ideas = [];

    if (
        interest.includes("fashion") ||
        interest.includes("clothes") ||
        interest.includes("shoes") ||
        interest.includes("bag")
    ) {

        if (budget < 10000) {
            ideas = [
                "👗 Start selling affordable clothes online",
                "👜 Resell handbags through WhatsApp and TikTok",
                "👠 Sell selected shoes and fashion accessories"
            ];
        } else if (budget < 50000) {
            ideas = [
                "👗 Start a small clothes boutique",
                "👜 Buy handbags and shoes wholesale for resale",
                "📱 Start an online fashion store"
            ];
        } else {
            ideas = [
                "🏪 Open a small fashion shop",
                "🛍️ Start a boutique with clothes, shoes and handbags",
                "📦 Become a fashion wholesaler and retailer"
            ];
        }

    } else if (
        interest.includes("food") ||
        interest.includes("cooking") ||
        interest.includes("snack")
    ) {

        if (budget < 10000) {
            ideas = [
                "🍩 Sell homemade snacks",
                "🥚 Start an eggs and smokies business",
                "🍿 Sell snacks around a busy area"
            ];
        } else if (budget < 50000) {
            ideas = [
                "🍗 Start a small food takeaway",
                "🥘 Sell cooked meals",
                "🥤 Start a juice and snacks business"
            ];
        } else {
            ideas = [
                "🍽️ Open a small restaurant",
                "🍗 Start a takeaway food business",
                "🥤 Build a food and beverage shop"
            ];
        }

    } else if (
        interest.includes("beauty") ||
        interest.includes("cosmetic") ||
        interest.includes("salon")
    ) {

        ideas = [
            "💄 Sell cosmetics online",
            "💇 Start a small beauty service",
            "🧴 Resell beauty and skincare products"
        ];

    } else if (
        interest.includes("technology") ||
        interest.includes("tech") ||
        interest.includes("computer")
    ) {

        ideas = [
            "💻 Start a computer services business",
            "📱 Sell phone accessories",
            "🖥️ Offer digital services to small businesses"
        ];

    } else {

        ideas = [
            "🛍️ Start a small retail business",
            "📱 Sell products online through WhatsApp and social media",
            "📦 Start a product reselling business"
        ];
    }


    result.innerHTML = `
        <h3>💡 Business Ideas for You</h3>

        <p>
            Based on a budget of <strong>KSh ${budget.toLocaleString()}</strong>
            and your interest in <strong>${interest}</strong>:
        </p>

        <br>

        ${ideas.map((idea, index) =>
            `<p><strong>${index + 1}.</strong> ${idea}</p>`
        ).join("")}

        <br>

        <p>
            🚀 <strong>BizGenius Tip:</strong>
            Start small, test your market, and reinvest your profits as your
            business grows.
        </p>
    `;
}