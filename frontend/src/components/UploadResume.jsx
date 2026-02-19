import React, { useState } from "react";
import axios from "axios";

const UploadResume = ({ setResumeText, addToHistory }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file!");
      setTimeout(() => setError(""), 2500);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/analyze/resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResumeText(res.data.text);

      // Demo result (replace later with real backend)
      const result = {
        resumeLink: URL.createObjectURL(file),
        job: "Frontend Developer",
        score: Math.floor(Math.random() * 20) + 70,
        createdAt: new Date().toISOString(),
      };

      if (addToHistory) addToHistory(result);

      setSuccess("Resume uploaded successfully!");
      setTimeout(() => setSuccess(""), 2500);

    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Failed to upload resume");
      setTimeout(() => setError(""), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow relative">

      {/* Success Toast */}
      {success && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 animate-fade-in">
          <span className="text-lg">✅</span>
          <span className="text-sm font-medium">{success}</span>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 animate-fade-in">
          <span className="text-lg">❌</span>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Upload Your Resume
      </h2>

      <label className="border-2 border-dashed border-indigo-300 rounded-xl p-6 text-center cursor-pointer hover:bg-indigo-50 transition block">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-gray-600">
          {file
            ? file.name
            : "Drag & drop your resume here or click to upload"}
        </p>
      </label>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
};

export default UploadResume;
