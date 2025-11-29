import fs from "fs";
import path from "path";

const usersPath = path.resolve("data/users.json");
const activitiesPath = path.resolve("data/activities.json");

function readJSON(filePath) {
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// USERS
export function saveUser(userId, userData) {
  const users = readJSON(usersPath);
  users[userId] = userData;
  writeJSON(usersPath, users);
}

export function getUser(userId) {
  const users = readJSON(usersPath);
  return users[userId] || null;
}

// ACTIVITIES
export function saveActivities(userId, activities) {
  const allActivities = readJSON(activitiesPath);
  allActivities[userId] = activities;
  writeJSON(activitiesPath, allActivities);
}

export function getUserActivities(userId) {
  const allActivities = readJSON(activitiesPath);
  return allActivities[userId] || [];
}

// RANKING
export function getRanking() {
  const users = readJSON(usersPath);
  return Object.values(users)
    .sort((a, b) => b.xp - a.xp)
    .map(u => ({
      id: u.id,
      name: u.name,
      xp: u.xp
    }));
}
