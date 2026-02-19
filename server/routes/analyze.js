// server/routes/analyze.js

const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractSkills = require("../utils/skillExtractor");
const calculateScore = require("../utils/scorer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* -------------------- Resume Upload Route -------------------- */

router.post("/resume", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let text = "";

    // Handle PDF
    if (req.file.mimetype.includes("pdf")) {
      const data = await pdf(req.file.buffer);
      text = data.text;
    }

    // Handle DOC / DOCX
    else if (
      req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      req.file.mimetype === "application/msword"
    ) {
      const result = await mammoth.extractRawText({
        buffer: req.file.buffer,
      });
      text = result.value;
    }

    else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Failed to extract text from resume",
      });
    }

    res.json({ text });

  } catch (err) {
    console.error("Resume parsing error:", err);
    res.status(500).json({ error: "Failed to parse resume" });
  }
});

/* -------------------- Job Analysis Route -------------------- */

router.post("/job", (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        error: "Resume and Job Description are required",
      });
    }

    // Extract skills separately
    const resumeSkills = extractSkills(resume);
    const jobSkills = extractSkills(jobDescription);

    // Calculate score + suggestions
    const result = calculateScore(resumeSkills, jobSkills, resume);


    res.json(result);

  } catch (err) {
    console.error("Job analyze error:", err);
    res.status(500).json({ error: "Failed to analyze job" });
  }
});

module.exports = router;
