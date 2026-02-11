import React, { useState } from "react";
import axios from "axios";

const JobMatch = ({ resumeText, addToHistory }) => {
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Animated Score Icon
  const getScoreIcon = (score) => {
    if (score >= 75) {
      return (
        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-green-500 text-green-500 animate-pulse text-xl">
          ✓
        </div>
      );
    }
    if (score >= 55) {
      return (
        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-orange-400 text-orange-500 animate-bounce text-xl">
          !
        </div>
      );
    }
    return (
      <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 animate-pulse text-xl">
        ✕
      </div>
    );
  };

  const handleAnalyze = async () => {
    if (!jobDesc) return alert("Enter a job description!");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/analyze/job",
        {
          resume: resumeText,
          jobDescription: jobDesc,
        }
      );

      setResult(res.data);

      // 🔹 Save to history (if function passed)
      if (addToHistory) {
        addToHistory({
          job: jobDesc,
          score: res.data.matchScore,
          missingSkills: res.data.missingSkills,
          suggestions: res.data.suggestions,
          createdAt: new Date().toISOString(),
        });
      }

    } catch (err) {
      console.error("Analysis error:", err);
      alert("Failed to analyze job description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">Job Description</h2>

      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        rows={6}
      />

      <button
        onClick={handleAnalyze}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* 🔹 RESULT SECTION */}
      {result && (
        <div className="mt-8 border-t pt-6 space-y-4">
          <div className="flex items-center gap-4">
            {getScoreIcon(result.matchScore)}
            <h3 className="text-2xl font-bold">
              Match Score: {result.matchScore}%
            </h3>
          </div>

          <p>
            <strong>Missing Skills:</strong>{" "}
            {result.missingSkills?.length > 0
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
