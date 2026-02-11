// server/routes/analyze.js

const express = require("express");
const multer = require("multer");
// // const pdf = require("pdf-parse").default;
// const pdfModule = require("pdf-parse");  // import the module
// const pdf = pdfModule.default || pdfModule;  // get the actual function

/*--------------------check-------------------*/

// const pdfModule = require("pdf-parse");

// This handles the three most common export patterns
// const pdf = (typeof pdfModule === 'function') 
//     ? pdfModule 
//     : (pdfModule.default || pdfModule.pdf || pdfModule);

// if (typeof pdf !== 'function') {
//     console.error("Debug: pdfModule structure is:", pdfModule);
//     throw new TypeError("pdf-parse could not find the main function. Check the console log above.");
// }

// const pdfModule = require("pdf-parse");

const pdf = require("pdf-parse");



const pdfModule = require("pdf-parse");

// We check .default, then .pdf, then the module itself
// const pdf = pdfModule.default || pdfModule.pdf || (typeof pdfModule === 'function' ? pdfModule : null);

if (typeof pdf !== 'function') {
    console.log("Keys available in this module:", Object.keys(pdfModule));
    throw new Error("STILL NOT A FUNCTION: Try 'npm install pdf-parse@1.1.1' for a more stable version.");
}

// In this specific version/fork, the function is often nested
// const pdf = pdfModule.default || pdfModule.parse || pdfModule; 

// Test it
console.log("Type of pdf:", typeof pdf);

const mammoth = require("mammoth");

const router = express.Router();

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

/* ----------- Resume Upload Route ----------- */
router.post("/resume", upload.single("file"), async (req, res) => {
  try {
    console.log("=== Resume Upload Hit ===");   // <-- ADD THIS
    console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let text = "";

    console.log("File mimetype:", req.file.mimetype);
    console.log("File originalname:", req.file.originalname);
    console.log("File size:", req.file.size);

    // PDF
    if ( req.file.mimetype.includes("pdf")) {
      const data = await pdf(req.file.buffer);
      text = data.text;
      try {
        const data = await pdf(req.file.buffer);
        text = data.text;
      } catch (err) {
        console.error("PDF parse error:", err);
        return res.status(400).json({ error: "Invalid PDF file" });
      }

      // DOC/DOCX
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      req.file.mimetype === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = result.value;

    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Failed to extract text from resume" });
    }

    res.json({ text });
  }
  catch (err) {
    console.error("Resume parsing ERROR:", err);
    res.status(500).json({ error: "Failed to parse resume" });
  }
  //     finally {
  //   console.log("hogya"); // Always runs
  // }
});

/* ----------- Job Analysis Route ----------- */
router.post("/job", async (req, res) => {
  try {
    console.log("Job analyze hit! req.body:", req.body);

    const { resume, jobDescription } = req.body;
    if (!resume || !jobDescription) {
      return res.status(400).json({ error: "Resume and Job Description are required" });
    }

    // --- Mock AI analysis ---
    const resumeSkills = ["JavaScript", "React", "Node.js"];
    const jobSkills = ["JavaScript", "React", "Node.js", "AWS", "Docker"];
    const missingSkills = jobSkills.filter((skill) => !resumeSkills.includes(skill));
    // const matchScore = Math.round(
    //   ((jobSkills.length - missingSkills.length) / jobSkills.length) * 100
    // );
    const matchScore = 90;

    const suggestions = [
      "Add quantifiable achievements",
      "Use action verbs",
      "Tailor summary to job role",
    ];

    res.json({ matchScore, missingSkills, suggestions });
  } catch (err) {
    console.error("Job analyze error:", err);
    res.status(500).json({ error: "Failed to analyze job" });
  }
});

module.exports = router;
