export function computeXpAndAchievements(activities) {
  let xp = 0;
  let achievements = new Set();

  for (const a of activities) {
    const km = a.distance / 1000;
    const elev = a.total_elevation_gain || 0;
    const hours = Math.floor((a.moving_time || 0) / 3600);

    let baseXp = 0;

    // ==== XP BASE POR DEPORTE ====

    if (a.type === "Swim") {
      // Natación
      baseXp = km * 10;
    }

    else if (
      a.type === "Run" ||
      a.type === "Walk" ||
      a.type === "Hike"
    ) {
      // Senderismo, paseo, correr
      baseXp = km * 5;
    }

    else if (a.type === "Ride") {
      // Detectamos MTB según desnivel por hora
      const elevRate = hours > 0 ? (elev / hours) : 0;

      if (elevRate > 600) {
        // Bicicleta de montaña
        baseXp = km * 2;
      } else {
        // Bicicleta de carretera
        baseXp = km * 1;
      }
    }

    xp += Math.floor(baseXp);

    // ==== BONUS DESNIVEL ====
    xp += Math.floor(elev / 100) * 5;

    // ==== BONUS DURACIÓN ====
    xp += hours * 5;
  }

  // ==== LOGROS BÁSICOS (puedes modificar luego) ====
  if (activities.length >= 1) achievements.add("first-activity");
  if (activities.length >= 10) achievements.add("10-activities");
  if (activities.length >= 50) achievements.add("50-activities");

  return {
    xp,
    achievements: Array.from(achievements)
  };
}

