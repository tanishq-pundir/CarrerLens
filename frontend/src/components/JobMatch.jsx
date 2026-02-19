import React, { useState } from "react";
import axios from "axios";

const JobMatch = ({ resumeText, addToHistory }) => {
  const [jobRole, setJobRole] = useState("frontend");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ------------------------------------------------ */
  /* JOB ROLE TEMPLATES (DO NOT TOUCH — YOUR DATA)    */
  /* ------------------------------------------------ */

  const jobTemplates = {
    frontend: `Frontend Developer required with strong knowledge of JavaScript, React, HTML, CSS, responsive design, REST APIs, Git, and UI performance optimization.`,

    backend: `Backend Developer required with Node.js, Express, databases (MongoDB or MySQL), API development, authentication, Docker, and cloud deployment.`,

    fullstack: `Full Stack Developer required with React, Node.js, Express, databases, REST APIs, system design, Git, and cloud platforms like AWS.`,

    data: `Data Analyst required with Python, SQL, Excel, data visualization (Power BI or Tableau), statistics, and data cleaning.`,

    ml: `Machine Learning Engineer required with Python, TensorFlow or PyTorch, data preprocessing, model training, deep learning, and deployment.`,
  };

  /* ------------------------------------------------ */
  /* ROLE LABELS                                      */
  /* ------------------------------------------------ */

  const roleLabels = {
    frontend: "Frontend Developer",
    backend: "Backend Developer",
    fullstack: "Full Stack Developer",
    data: "Data Analyst",
    ml: "Machine Learning Engineer",
  };

  /* ------------------------------------------------ */
  /* SCORE ICON                                       */
  /* ------------------------------------------------ */

  const getScoreIcon = (score) => {
    if (score >= 75)
      return (
        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-green-500 text-green-500 animate-pulse text-xl">
          ✓
        </div>
      );

    if (score >= 55)
      return (
        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-orange-400 text-orange-500 animate-bounce text-xl">
          !
        </div>
      );

    return (
      <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 animate-pulse text-xl">
        ✕
      </div>
    );
  };

  /* ------------------------------------------------ */
  /* ANALYZE                                          */
  /* ------------------------------------------------ */

  const handleAnalyze = async () => {
    if (!resumeText) return alert("Upload resume first");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/analyze/job",
        {
          resume: resumeText,
          jobDescription: jobTemplates[jobRole],
        }
      );

      setResult(res.data);

      if (addToHistory) {
        addToHistory({
          job: jobRole,
          score: res.data.matchScore,
          missingSkills: res.data.missingSkills,
          suggestions: res.data.suggestions,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to analyze job role");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------ */
  /* UI                                               */
  /* ------------------------------------------------ */

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6">

      <h2 className="text-xl font-semibold">Select Job Role</h2>

      {/* ================================================= */}
      {/* GLASSMORPHISM EXPANDABLE DROPDOWN                */}
      {/* ================================================= */}

      <div className="relative">

        {/* Selected */}
        <div
          onClick={() => setOpen(!open)}
          className="
            cursor-pointer
            px-4 py-3
            rounded-xl
            bg-white/40
            backdrop-blur-lg
            border border-white/30
            shadow-lg
            hover:bg-white/60
            transition-all
            duration-300
            flex justify-between items-center
          "
        >
          <span className="font-medium">{roleLabels[jobRole]}</span>

          <span
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>

        {/* Options */}
        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            ease-in-out
            ${open ? "max-h-80 mt-3" : "max-h-0"}
          `}
        >
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg">

            {Object.keys(roleLabels).map((role) => (
              <div
                key={role}
                onClick={() => {
                  setJobRole(role);
                  setOpen(false);
                }}
                className="
                  px-4 py-3
                  cursor-pointer
                  hover:bg-white/60
                  transition
                  border-b last:border-none
                "
              >
                {roleLabels[role]}
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* ================================================= */}
      {/* ANALYZE BUTTON                                   */}
      {/* ================================================= */}

      <button
        onClick={handleAnalyze}
        className="
          bg-green-500
          hover:bg-green-600
          text-white
          px-6 py-3
          rounded-xl
          shadow-md
          transition-all
          duration-200
        "
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* ================================================= */}
      {/* RESULT                                           */}
      {/* ================================================= */}

      {result && (
        <div className="border-t pt-6 space-y-4">

          <div className="flex items-center gap-4">
            {getScoreIcon(result.matchScore)}
            <h3 className="text-2xl font-bold">
              Match Score: {result.matchScore}%
            </h3>
          </div>

          <p>
            <strong>Missing Skills:</strong>{" "}
            {result.missingSkills?.length
              ? result.missingSkills.join(", ")
              : "None 🎉"}
          </p>

          <div>
            <strong>Suggestions:</strong>
            <ul className="list-disc ml-6 mt-2">
              {result.suggestions?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default JobMatch;
