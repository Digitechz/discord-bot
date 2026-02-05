const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  name: "steph",
  description: "Talk to Steph",
  async execute(message, args) {
    try {
      const prompt = args.join(" ");
      if (!prompt) {
        return message.reply("💭 Talk to me. I’m listening.");
      }

      const response = await fetch(
        "https://router.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: `You are Steph, a witty, playful, intelligent girl who replies like a real person.\nUser: ${prompt}\nSteph:`,
            parameters: {
              max_new_tokens: 120,
              temperature: 0.8,
              top_p: 0.9
            }
          })
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error("HF Error:", err);
        return message.reply("🧠 Steph stared into the void and forgot how words work.");
      }

      const data = await response.json();
      const reply =
        data?.[0]?.generated_text?.split("Steph:").pop()?.trim();

      if (!reply) {
        return message.reply("😶 Steph thought very hard and said nothing.");
      }

      message.reply(reply);
    } catch (err) {
      console.error(err);
      message.reply("💥 Steph tripped over reality. Try again.");
    }
  }
};
