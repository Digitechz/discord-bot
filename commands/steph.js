// commands/steph.js
const fetch = require("node-fetch");
const { getUserMemory, addUserMemory } = require("../stats/stephMemory");

module.exports = {
  name: "steph",
  description: "Talk to Steph AI",
  async execute(message, args) {
    const userId = message.author.id;
    const userInput = args.join(" ");
    if (!userInput) return message.reply("💭 You need to say something!");

    addUserMemory(userId, { role: "user", content: userInput });

    const history = getUserMemory(userId);

    try {
      // Call a free HuggingFace model
      const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: history.map(h => `${h.role === "user" ? "User" : "Steph"}: ${h.content}`).join("\n") + "\nSteph:"
        })
      });

      const data = await response.json();
      if (!data || !data[0]?.generated_text) throw new Error("No response");

      const reply = data[0].generated_text.split("Steph:").pop().trim();
      addUserMemory(userId, { role: "steph", content: reply });

      await message.reply(reply);
    } catch (err) {
      console.error("Steph AI error:", err.message || err);
      await message.reply("🧠 Steph’s brain overheated. Try again in a bit.");
    }
  }
};
