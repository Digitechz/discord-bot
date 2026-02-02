const { initUser, updateStat, renderStats } = require("../stats");

module.exports = {
  name: "update",
  async execute(message, args) {
    if (args.length < 3) {
      return message.reply(
        "Usage: `!update <stat> <name> <value> [cap]`"
      );
    }

    const stat = args[0].toLowerCase();
    const name = args[1];
    const value = parseInt(args[2]);
    const cap = args[3] ? parseInt(args[3]) : null;

    if (isNaN(value)) return message.reply("Value must be a number.");

    initUser(name);
    updateStat(name, stat, value, cap);

    const content = renderStats(name);

    if (message.reference) {
      const old = await message.channel.messages.fetch(
        message.reference.messageId
      );
      if (old.author.id === message.client.user.id) {
        await old.edit(content);
      } else {
        await message.channel.send(content);
      }
    } else {
      await message.channel.send(content);
    }

    await message.reply(`Updated ${name}'s ${stat.toUpperCase()}`);
  }
};
