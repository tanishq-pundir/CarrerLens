import React, { useState } from "react";
import UploadResume from "./components/UploadResume";
import JobMatch from "./components/JobMatch";

function App() {
  const [resumeText, setResumeText] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">CareerLens</h1>
      <UploadResume setResumeText={setResumeText} />
      <JobMatch resumeText={resumeText} />
    </div>
  );
}

export default App;
