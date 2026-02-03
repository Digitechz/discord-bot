const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  name: "steph",
  description: "Talk to Steph (AI)",
  async execute(message, args) {
    if (!args.length) {
      return message.reply("💬 Say something to Steph~");
    }

    const userMessage = args.join(" ");

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are Steph, a witty, playful, intelligent female character. Speak naturally, casually, and like a real person. Be expressive but not cringe.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.8,
      });

      const reply = chatCompletion.choices[0]?.message?.content;

      if (!reply) {
        return message.reply("🤯 Steph blanked out for a second… try again?");
      }

      await message.reply(reply);
    } catch (err) {
      console.error("Steph AI error:", err);
      message.reply("🧠 Steph’s brain overheated. Try again in a bit.");
    }
  },
};
