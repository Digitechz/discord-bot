// stats/stephMemory.js
const fs = require("fs");
const path = "./stats/stephMemory.json";

function loadMemory() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function saveMemory(memory) {
  fs.writeFileSync(path, JSON.stringify(memory, null, 2));
}

function getUserMemory(userId) {
  const memory = loadMemory();
  if (!memory[userId]) memory[userId] = [];
  return memory[userId];
}

function addUserMemory(userId, message) {
  const memory = loadMemory();
  if (!memory[userId]) memory[userId] = [];
  memory[userId].push(message);
  if (memory[userId].length > 10) memory[userId].shift(); // keep last 10 messages
  saveMemory(memory);
}

module.exports = { getUserMemory, addUserMemory };
