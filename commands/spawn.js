module.exports = {
  name: "spawn",
  description: "Spawn a random beast",
  execute(message, args) {
    const beasts = [
      "🐲 Dragon",
      "🦄 Unicorn",
      "🐺 Werewolf",
      "🦖 T-Rex",
      "🕷️ Giant Spider",
      "🧟 Zombie",
      "🐉 Wyvern",
      "🦈 Sea Serpent"
    ];

    // Pick a random beast
    const randomBeast = beasts[Math.floor(Math.random() * beasts.length)];
    message.reply(`A wild ${randomBeast} has appeared!`);
  },
};
