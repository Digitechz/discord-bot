const fs = require("fs");
const path = "./stats.json";

function loadStats() {
  if (!fs.existsSync(path)) return {};
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function saveStats(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function initUser(name) {
  const data = loadStats();

  if (!data[name]) {
    data[name] = {
      hp: 20,
      hpMax: 20,
      mp: 20,
      mpMax: 20,
      attack: 10,
      defense: 10,
      speed: 10,
      accuracy: 10,
      luck: 0,
      fatigue: 0,
      energy: 100
    };
    saveStats(data);
  }
}

function applyFatigue(stat, fatigue) {
  return Math.floor(stat * (100 - fatigue) / 100);
}

function renderStats(name) {
  const data = loadStats();
  const s = data[name];
  if (!s) return null;

  return {
    ...s,
    attackEff: applyFatigue(s.attack, s.fatigue),
    defenseEff: applyFatigue(s.defense, s.fatigue),
    speedEff: applyFatigue(s.speed, s.fatigue),
    accuracyEff: applyFatigue(s.accuracy, s.fatigue),
  };
}

module.exports = { initUser, renderStats, loadStats, saveStats };
