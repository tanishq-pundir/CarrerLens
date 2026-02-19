const SKILL_DB = require("./skillDB");

function extractSkills(text) {
  const lowerText = text.toLowerCase();
  let foundSkills = [];

  for (let category in SKILL_DB) {
    SKILL_DB[category].forEach(skillObj => {
      if (lowerText.includes(skillObj.name.toLowerCase())) {
        foundSkills.push(skillObj);
      }
    });
  }

  return foundSkills;
}

module.exports = extractSkills;
