const stats = {};

function initUser(user) {
  if (!stats[user]) {
    stats[user] = {
      HP: { current: 20, max: 20 },
      MP: { current: 20, max: 20 },

      fatigue: 0,   // %
      hunger: 100,  // %

      attack: 10,
      defence: 10,
      speed: 10,
      accuracy: 10,
      luck: 0
    };
  }
  return stats[user];
}

// bar generator
function bar(current, max, size = 10) {
  const filled = Math.round((current / max) * size);
  const empty = size - filled;
  return "▰".repeat(filled) + "▱".repeat(empty);
}

function renderStats(user) {
  const s = stats[user];

  return `
**${user}**
❤️ HP ${bar(s.HP.current, s.HP.max)} (${s.HP.current}/${s.HP.max})
🔮 MP ${bar(s.MP.current, s.MP.max)} (${s.MP.current}/${s.MP.max})

⚔️ Attack: ${s.attack}
🛡️ Defence: ${s.defence}
🏃 Speed: ${s.speed}
🎯 Accuracy: ${s.accuracy}
🍀 Luck: ${s.luck}

😵 Fatigue: ${bar(s.fatigue, 100)} (${s.fatigue}%)
🍖 Hunger: ${bar(s.hunger, 100)} (${s.hunger}%)
`.trim();
}

function updateStat(user, stat, value, cap = null) {
  initUser(user);

  if (stat === "HP" || stat === "MP") {
    stats[user][stat].current = value;
    if (cap !== null) stats[user][stat].max = cap;
  } else if (stat === "fatigue" || stat === "hunger") {
    stats[user][stat] = Math.max(0, Math.min(100, value));
  } else {
    stats[user][stat] = value;
  }
}

module.exports = { initUser, updateStat, renderStats };
