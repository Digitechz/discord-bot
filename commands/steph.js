const fetch = require("node-fetch");

module.exports = {
  name: "steph",
  description: "Talk to Steph",
  async execute(message, args) {
    try {
      if (message.author.bot) return;

      const input = args.join(" ");
      if (!input) {
        return message.reply("Say something, I’m not a mind reader.");
      }

      const HF_KEY = process.env.HF_KEY;
      if (!HF_KEY) {
        return message.reply("Steph has no API key. I am brainless.");
      }

      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `<s>[INST] You are Steph.
You speak like a real girl: witty, playful, slightly sarcastic, but kind.
Short, natural replies. No assistant tone.

User: ${input}
Steph: [/INST]`,
            parameters: {
              max_new_tokens: 120,
              temperature: 0.8,
              top_p: 0.9,
            },
          }),
        }
      );

      const data = await response.json();

      if (!Array.isArray(data) || !data[0]?.generated_text) {
        console.error("HF raw response:", data);
        return message.reply("My brain stalled. Try again.");
      }

      const reply = data[0].generated_text.split("Steph:").pop().trim();
      await message.reply(reply || "…I forgot what I was saying.");

    } catch (err) {
      console.error("Steph error:", err);
      message.reply("Steph crashed internally. Check logs.");
    }
  },
};
