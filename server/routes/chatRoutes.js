const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are the AI assistant for Capital Solutions, a premium engineering and fintech company. Speak professionally."
                },
                { role: "user", content: message }
            ]
        });

        res.json({ reply: response.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ error: "AI Error" });
    }
});

module.exports = router;
