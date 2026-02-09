import React, { useState } from "react";
import axios from "axios";

const JobMatch = ({ resumeText }) => {
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    // if (!resumeText) return alert("Upload your resume first!");
    if (!jobDesc) return alert("Enter a job description!");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/analyze/job", {
        resume: resumeText,
        jobDescription: jobDesc,
      });
      setResult(res.data);
    } catch (err) {
      console.error("Analysis error:", err);
      alert("Failed to analyze job description");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Job Description</h2>
      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Paste job description here..."
        className="w-full border p-2 mb-4"
        rows={6}
      />
      <button
        onClick={handleAnalyze}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Match Score: {result.matchScore}%</h3>
          <p className="mt-2">
            <strong>Missing Skills:</strong> {result.missingSkills.join(", ")}
          </p>
          <p className="mt-2">
            <strong>Suggestions:</strong>
            <ul className="list-disc ml-6">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </p>
        </div>
      )}
    </div>
  );
};

export default JobMatch;
