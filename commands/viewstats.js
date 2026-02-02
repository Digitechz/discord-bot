const { initUser, renderStats } = require("../stats");

module.exports = {
  name: "viewstats",
  description: "View stats for a character",
  execute(message, args) {
    const charName = args[0] || message.author.username; // default to author's name
    initUser(charName); // make sure the character exists

    const statsOutput = renderStats(charName);
    message.channel.send(statsOutput);
  },
};
