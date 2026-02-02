const { initUser, renderStats } = require("../stats");

module.exports = {
  name: "viewstats",
  description: "View stats for a character",
  execute(message, args) {
    if (!args[0]) {
      return message.reply("❌ Please provide a character name. Example: `!viewstats Sora`");
    }

    const charName = args[0]; // use the character name the user inputs
    initUser(charName); // make sure the character exists

    const statsOutput = renderStats(charName);
    message.channel.send(statsOutput);
  },
};
