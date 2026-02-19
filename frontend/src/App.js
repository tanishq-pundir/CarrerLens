import React, { useState } from "react";
import UploadResume from "./components/UploadResume";
import JobMatch from "./components/JobMatch";
import Navbar from "./components/Navbar";
import Uploads from "./components/Uploads";
import "./App.css";


function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null); // { score, job }
  const [history, setHistory] = useState([]);
  const [view, setView] = useState("home");

  const addToHistory = (data) => {
    setHistory((prev) => {
      const updated = [data, ...prev];
      return updated.slice(0, 10);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Navbar setView={setView} />

      {/* HOME */}
      {view === "home" && (
        <>
          {/* Center Hero */}
          <div className="text-center py-16 px-6">
            <h1 className="text-5xl font-extrabold text-indigo-600 mb-3">
              CareerLens
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Upload your resume and match it with a job description to see how
              well you fit.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-6 pb-16 space-y-12">
            <UploadResume setResumeText={setResumeText} />
            <JobMatch
              resumeText={resumeText}
              jobDesc={jobDesc}
              setJobDesc={setJobDesc}
              setResult={setResult}
              addToHistory={addToHistory}
            />
          </div>
        </>
      )}

      {/* UPLOADS */}
      {view === "uploads" && (
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <Uploads
            history={history}
            clearHistory={() => setHistory([])}
            goBack={() => setView("home")}
          />
        </div>
      )}
    </div>
  );
}

export default App;
