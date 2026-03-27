const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  name: "steph",
  async execute(message, args) {
    try {
      const userInput = args.join(" ");
      if (!userInput) {
        return message.reply("💭 Say something. I’m right here.");
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Steph — witty, playful, intelligent, slightly teasing but helpful.\nUser: ${userInput}\nSteph:`
                  }
                ]
              }
            ]
          })
        }
      );

      if (!res.ok) {
        const t = await res.text();
        console.error("Gemini Error:", t);
        return message.reply("🧠 Steph got confused.");
      }

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!reply) {
        return message.reply("😶 Steph had nothing to say.");
      }

      message.reply(reply);

    } catch (err) {
      console.error(err);
      message.reply("💥 Steph crashed. Try again.");
    }
  }
};