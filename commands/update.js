const { initUser, updateStat, renderStats } = require("../stats");

module.exports = {
  name: "update",
  description: "Update character stats",
  async execute(message, args) {
    // Usage:
    // !update <stat> <name> <value> [cap]
    // example: !update hp sora -5
    // example: !update mp sora 5 20

    if (args.length < 3) {
      return message.reply(
        "Usage: `!update <stat> <name> <value> [cap]`\nExample: `!update hp sora -5`"
      );
    }

    const stat = args[0].toLowerCase();
    const name = args[1];
    const value = parseInt(args[2]);
    const cap = args[3] ? parseInt(args[3]) : null;

    if (isNaN(value)) {
      return message.reply("❌ Value must be a number.");
    }

    // Initialize character if needed
    initUser(name);

    // Update stat
    updateStat(name, stat, value, cap);

    // Render stats bar
    const statsMessage = renderStats(name);

    try {
      // If replying to a bot message, edit it
      if (message.reference) {
        const oldMsg = await message.channel.messages.fetch(
          message.reference.messageId
        );

        if (oldMsg.author.id === message.client.user.id) {
          await oldMsg.edit(statsMessage);
        } else {
          await message.channel.send(statsMessage);
        }
      } else {
        await message.channel.send(statsMessage);
      }

      await message.reply(`✅ Updated **${name}**'s **${stat.toUpperCase()}**`);
    } catch (err) {
      console.error(err);
      message.reply("❌ Faile
