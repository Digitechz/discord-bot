module.exports = {
  name: "roll",
  description: "Roll a random number",
  execute(message, args) {
    let min = 1;
    let max = 100;

    if (args[0]) min = parseInt(args[0]);
    if (args[1]) max = parseInt(args[1]);

    if (isNaN(min) || isNaN(max) || min > max) {
      return message.reply("Please provide valid numbers. Example: `!roll 1 100`");
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    message.reply(`🎲 You rolled: ${result}`);
  },
};
