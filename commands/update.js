const fs = require("fs");
const path = "./stats.json";

module.exports = {
  name: "updatestats",
  description: "Update a character stat",
  execute(message, args) {
    // Permission check (optional – remove if you want)
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("❌ You are not allowed to use this command.");
    }

    if (args.length < 3) {
      return message.reply(
        "Usage: `!updatestats <stat> <character> <value>`"
      );
    }

    const stat = args[0].toLowerCase(); // s / d / etc
    const character = args[1];
    const value = Number(args[2]);

    if (Number.isNaN(value)) {
      return message.reply("❌ Value must be a number.");
    }

    // Load stats
    let stats = {};
    if (fs.existsSync(path)) {
      stats = JSON.parse(fs.readFileSync(path, "utf8"));
    }

    // Init character if missing
    if (!stats[character]) {
      stats[character] = {};
    }

    // Update stat
    stats[character][stat] = value;

    // Save
    fs.writeFileSync(path, JSON.stringify(stats, null, 2));

    message.reply(
      `✅ **${character}** → ${stat.toUpperCase()} updated to **${value}**`
    );
  },
};
