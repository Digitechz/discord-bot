const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

module.exports = {
  name: "steph",
  async execute(message, args) {
    try {
      const userInput = args.join(" ");
      if (!userInput) {
        return message.reply("💭 Say something. I’m literally right here.");
      }

      const res = await fetch(
        `https://api-inference.huggingface.co/pipeline/text-generation/${MODEL}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: `You are Steph — witty, playful, smart, and human.\nUser: ${userInput}\nSteph:`,
            parameters: {
              max_new_tokens: 120,
              temperature: 0.8,
              top_p: 0.9,
              return_full_text: false
            }
          })
        }
      );

      if (!res.ok) {
        const t = await res.text();
        console.error("HF Error:", t);
        return message.reply("🧠 Steph short-circuited mid-thought.");
      }

      const data = await res.json();
      const reply = data?.[0]?.generated_text?.trim();

      if (!reply) {
        return message.reply("😶 Steph forgot what she was saying.");
      }

      message.reply(reply);

    } catch (err) {
      console.error(err);
      message.reply("💥 Steph tripped over reality. Try again.");
    }
  }
};
