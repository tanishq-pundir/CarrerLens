function calculateScore(resumeSkills, jobSkills, resumeText) {

  let totalWeight = 0;
  let matchedWeight = 0;

  const missingSkills = [];

  jobSkills.forEach(jobSkill => {
    totalWeight += jobSkill.weight;

    const matched = resumeSkills.find(
      resumeSkill => resumeSkill.name === jobSkill.name
    );

    if (matched) {
      matchedWeight += jobSkill.weight;
    } else {
      missingSkills.push(jobSkill.name);
    }
  });

  const matchScore = totalWeight === 0
    ? 0
    : Math.round((matchedWeight / totalWeight) * 100);

  let suggestions = [];

  if (missingSkills.length > 0) {
    suggestions.push(
      `Consider strengthening: ${missingSkills.slice(0, 3).join(", ")}`
    );
  }

  if (matchScore < 60) {
    suggestions.push("Improve alignment with core job requirements");
  }

  // ✅ Use resumeText instead of undefined resume
  if (
    resumeText.toLowerCase().includes("leetcode") ||
    resumeText.toLowerCase().includes("codeforces") ||
    resumeText.match(/\d+\+?\s*(problems|questions)/i)
  ) {
    suggestions.push("Strong problem-solving background detected");
  }

  return { matchScore, missingSkills, suggestions };
}

module.exports = calculateScore;
