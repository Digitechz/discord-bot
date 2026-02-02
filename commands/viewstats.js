const { renderStats } = require("../stats");

// Optional: allow everyone to view stats
// You can later restrict certain commands with allowedUsers array

module.exports = {
  name: "viewstats",
  description: "View your own or another user's stats",
  execute(message, args) {
    // Default to self if no argument provided
    const charName = args[0] || message.author.username;

    // Render the stats using your existing renderStats function
    let stats;
    try {
      stats = renderStats(charName);
    } catch (err) {
      console.error(err);
      return message.reply("❌ Could not find stats for that character.");
    }

    message.channel.send(`**Stats for ${charName}:**\n${stats}`);
  }
};
