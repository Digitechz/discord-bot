const fs = require("fs");
const FILE = "./stats.json";

let data = {};

if (fs.existsSync(FILE)) {
  data = JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function save() {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function initUser(name) {
  if (!data[name]) {
    data[name] = {
      hp: { cur: 20, max: 20 },
      mp: { cur: 20, max: 20 },
      attack: 10,
      defence: 10,
      speed: 10,
      accuracy: 10,
      luck: 0,
      fatigue: 0,
      hunger: 100
    };
    save();
  }
}

function updateStat(name, stat, value, cap = null) {
  initUser(name);

  if (data[name][stat]?.cur !== undefined) {
    data[name][stat].cur += value;
    if (cap !== null) data[name][stat].max = cap;

    data[name][stat].cur = Math.max(
      0,
      Math.min(data[name][stat].cur, data[name][stat].max)
    );
  } else if (data[name][stat] !== undefined) {
    data[name][stat] += value;
  }

  save();
}

function bar(cur, max, size = 10) {
  const filled = Math.round((cur / max) * size);
  return "▰".repeat(filled) + "▱".repeat(size - filled);
}

function renderStats(name) {
  const s = data[name];
  return (
`**${name}**
HP ${bar(s.hp.cur, s.hp.max)} (${s.hp.cur}/${s.hp.max})
MP ${bar(s.mp.cur, s.mp.max)} (${s.mp.cur}/${s.mp.max})

ATK ${s.attack}
DEF ${s.defence}
SPD ${s.speed}
ACC ${s.accuracy}
LUK ${s.luck}

Fatigue ${s.fatigue}%
Hunger ${s.hunger}%`
  );
}

module.exports = { initUser, updateStat, renderStats };
