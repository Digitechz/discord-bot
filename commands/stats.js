const fs = require("fs");
const path = "./stats.json";

module.exports = {
  name: "stats",
  description: "Show stats for a character",
  execute(message, args) {
    if (args.length < 1) {
      return message.reply("Usage: !stats <character_name>");
    }

    const charName = args[0];

    // Read stats
    if (!fs.existsSync(path)) {
      return message.reply("No stats found yet.");
    }

    const stats = JSON.parse(fs.readFileSync(path, "utf8"));

    if (!stats[charName]) {
      return message.reply(`No stats found for ${charName}.`);
    }

    const charStats = stats[charName];
    let reply = `📊 Stats for **${charName}**:\n`;

    for (const [stat, value] of Object.entries(charStats)) {
      reply += `${stat.toUpperCase()}: ${value}\n`;
    }

    message.reply(reply);
  },
};
