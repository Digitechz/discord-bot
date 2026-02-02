require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

// Create client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Load commands
const commands = new Map();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

// Ready event
client.once("ready", () => {
  console.log("🤖 Bot is online!");
});

// Message handler (ONLY ONE)
client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Simple test command
  if (commandName === "ping") {
    return message.reply("pong 🏓");
  }

  if (!commands.has(commandName)) return;

  try {
    await commands.get(commandName).execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply("❌ Error executing command.");
  }
});

// Login
console.log("TOKEN length:", process.env.TOKEN?.length);
client.login(process.env.TOKEN);
