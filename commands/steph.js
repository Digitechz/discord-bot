const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * Simple in-memory stats (NO external files)
 */
const stats = {
  messages: 0,
  lastUsed: null
};

module.exports = {
  name: "steph",
  description: "Talk to Steph",

  async execute(message, args) {
    const prompt = args.join(" ");
    if (!prompt) {
      return message.reply("Say something to me, genius 🧠✨");
    }

    stats.messages++;
    stats.lastUsed = new Date().toISOString();

    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/google/gemma-2-2b-it",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 150,
              temperature: 0.7
            }
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("HF Error:", errText);
        return message.reply("Brain freeze 🧊 try again in a sec.");
      }

      const data = await response.json();

      const reply =
        data?.[0]?.generated_text ||
        data?.generated_text ||
        "…I blanked out 😭";

      await message.reply(reply);

    } catch (err) {
      console.error("Steph crash:", err);
      message.reply("I tripped over my own thoughts 🫠");
    }
  },

  getStats() {
    return stats;
  }
};
