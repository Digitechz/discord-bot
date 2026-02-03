const { initUser, renderStats } = require("../stats");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "viewstats",
  description: "View a character's stats",
  execute(message, args) {
    if (!args[0]) {
      return message.reply("❌ Usage: `!viewstats <CharacterName>`");
    }

    const name = args[0];
    initUser(name);
    const s = renderStats(name);

    if (!s) return message.reply("❌ Character not found.");

    const embed = new EmbedBuilder()
      .setTitle(`📜 ${name}'s Stats`)
      .setColor(0x8be9fd)
      .addFields(
        { name: "❤️ HP", value: `${s.hp}/${s.hpMax}`, inline: true },
        { name: "🔮 MP", value: `${s.mp}/${s.mpMax}`, inline: true },
        { name: "⚔️ Attack", value: `${s.attackEff} (${s.attack})`, inline: true },
        { name: "🛡️ Defense", value: `${s.defenseEff} (${s.defense})`, inline: true },
        { name: "⚡ Speed", value: `${s.speedEff} (${s.speed})`, inline: true },
        { name: "🎯 Accuracy", value: `${s.accuracyEff} (${s.accuracy})`, inline: true },
        { name: "🍀 Luck", value: `${s.luck}`, inline: true },
        { name: "😵 Fatigue", value: `${s.fatigue}%`, inline: true },
        { name: "🔋 Energy", value: `${s.energy}%`, inline: true }
      )
      .setFooter({ text: "Effective stats reduced by fatigue" });

    message.channel.send({ embeds: [embed] });
  }
};
