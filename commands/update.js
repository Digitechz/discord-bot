module.exports = {
  name: "update",
  description: "Update a bot message by ID",
  async execute(message, args) {
    if (args.length < 2) {
      return message.reply("Usage: !update <messageID> <new content>");
    }

    const messageID = args.shift(); // first arg is message ID
    const newContent = args.join(" "); // rest is new content

    try {
      // Fetch the message from the same channel
      const msg = await message.channel.messages.fetch(messageID);

      // Make sure it's the bot's own message
      if (msg.author.id !== message.client.user.id) {
        return message.reply("I can only edit my own messages.");
      }

      await msg.edit(newContent);
      message.reply("✅ Message updated!");
    } catch (err) {
      console.error(err);
      message.reply("❌ Could not find the message or edit it.");
    }
  },
};
