const fs = require("fs");
const path = "./stats.json";

module.exports = {
  name: "viewstats",
  description: "View stats for a character",
  execute(message, args) {
    if (!args[0]) {
      return message.reply(
        "❌ Please provide a character name.\nExample: `!viewstats Sora`"
      );
    }

    const character = args[0];

    if (!fs.existsSync(path)) {
      return message.reply("❌ No stats database found.");
    }

    const stats = JSON.parse(fs.readFileSync(path, "utf8"));

    if (!stats[character]) {
      return message.reply("❌ Could not find stats for that character.");
    }

    const s = stats[character];

    // Helper to draw bars
    const bar = (value, max = 20, size = 10) => {
      const filled = Math.round((value / max) * size);
      return "▰".repeat(filled) + "▱".repeat(size - filled);
    };

    const output = `
**${character}**
❤️ HP  ${bar(s.hp ?? 20)} (${s.hp ?? 20}/20)
🔵 MP  ${bar(s.mp ?? 20)} (${s.mp ?? 20}/20)

⚔️ ATK  ${s.attack ?? 10}
🛡️ DEF  ${s.defence ?? 10}
💨 SPD  ${s.speed ?? 10}
🎯 ACC  ${s.accuracy ?? 10}
🍀 LUCK ${s.luck ?? 0}

😮‍💨 FATIGUE ${s.fatigue ?? 0}%
`;

    message.channel.send(output);
  },
};
