const fs = require("fs");
const path = "./stats.json";

module.exports = {
  name: "update",
  description: "Update character stats",
  execute(message, args) {
    if (args.length < 3) {
      return message.reply("Usage: !update <s/d> <char_name> <new value> [cap value]");
    }

    const statType = args[0].toLowerCase();
    const charName = args[1];
    const newValue = parseInt(args[2]);
    const capValue = args[3] ? parseInt(args[3]) : null;

    if (!["s", "d"].includes(statType)) {
      return message.reply("Stat type must be 's' or 'd'.");
    }
    if (isNaN(newValue)) {
      return message.reply("Please provide a valid number for new value.");
    }

    // Read existing stats
    let stats = {};
    if (fs.existsSync(path)) {
      stats = JSON.parse(fs.readFileSync(path, "utf8"));
    }

    // Initialize character if not exists
    if (!stats[charName]) {
      stats[charName] = { s: 0, d: 0 };
    }

    // Apply new value with optional cap
    let finalValue = newValue;
    if (capValue !== null && newValue > capValue) {
      finalValue = capValue;
    }

    stats[charName][statType] = finalValue;

    // Save back
    fs.writeFileSync(path, JSON.stringify(stats, null, 2));

    message.reply(`✅ Updated ${charName}'s ${statType.toUpperCase()} to ${finalValue}`);
  },
};
