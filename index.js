require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

// 1️⃣ Create the client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 2️⃣ Load commands dynamically
const commands = new Map();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

// 3️⃣ When bot is ready
client.once("ready", () => {
  console.log("Bot is online!");
});

// 4️⃣ Handle messages
client.on("messageCreate", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commandName === "ping") {
    message.reply("pong 🏓");
  } else if (commands.has(commandName)) {
    try {
      commands.get(commandName).execute(message, args);
    } catch (err) {
      console.error(err);
      message.reply("There was an error executing that command.");
    }
  }
});

const { initUser, updateStat, renderStats } = require("./stats");

client.on("messageCreate", async message => {
  if (!message.content.startsWith("!update")) return;

  const args = message.content.split(" ");
  const [, stat, user, value, cap] = args;

  initUser(user);
  updateStat(user, stat, parseInt(value), cap ? parseInt(cap) : null);

  const content = renderStats(user);

  if (message.reference) {
    const msg = await message.channel.messages.fetch(message.reference.messageId);
    await msg.edit(content);
  } else {
    await message.channel.send(content);
  }

  await message.reply(`✅ Updated ${user}'s ${stat}`);
});

// 5️⃣ Login
console.log("TOKEN length:", process.env.TOKEN?.length);

client.login(process.env.TOKEN);
