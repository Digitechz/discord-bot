const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  name: "steph",
  description: "Talk to Steph (AI)",
  async execute(message, args) {
    if (!args.length) {
      return message.reply("🧠 Talk to me. Try `!steph what should we do today?`");
    }

    const userMessage = args.join(" ");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are Steph.
You are witty, emotionally intelligent, slightly teasing, supportive,
and speak like a real human — not robotic.
Keep replies concise unless the user asks for detail.
`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      });

      const reply = response.choices[0].message.content;
      await message.reply(reply);

    } catch (err) {
      console.error("Steph AI error:", err);
      message.reply("❌ Steph’s brain glitched. Try again.");
    }
  },
};
