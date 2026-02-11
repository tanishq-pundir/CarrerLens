import { useState } from "react";

export default function Uploads({ history, clearHistory, goBack }) {
  const [openIndex, setOpenIndex] = useState(null);

  // 🔹 Animated score icon based on % score
  const getScoreIcon = (score) => {
    if (score >= 75) {
      return (
        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-500 text-green-500 animate-pulse">
          ✓
        </div>
      );
    }
    if (score >= 55) {
      return (
        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-orange-400 text-orange-500 animate-bounce">
          !
        </div>
      );
    }
    return (
      <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 animate-pulse">
        ✕
      </div>
    );
  };

  // 🔹 Format timestamp
  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={goBack} className="text-indigo-600 hover:underline">
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-indigo-600">Previous Uploads</h2>
      </div>

      {history.length === 0 && (
        <p className="text-gray-500">No uploads yet.</p>
      )}

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-gray-50"
          >
            {/* Top Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {getScoreIcon(item.score)}

                <div>
                  <p className="font-semibold text-gray-800">
                    Resume {history.length - index}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    Job: {item.job}
                  </p>
                  <p className="text-sm text-gray-600">
                    Score: {item.score}%
                  </p>
                  <p className="text-xs text-gray-400">
                    Uploaded: {formatTime(item.createdAt)}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="text-indigo-600 font-medium hover:underline"
              >
                {openIndex === index ? "Hide Result ▲" : "View Result ▼"}
              </button>
            </div>

            {/* Animated Dropdown */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-96 opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-white p-4 rounded-lg border space-y-2">
                <p>
                  <strong>Match Score:</strong> {item.score}%
                </p>

                <p>
                  <strong>Missing Skills:</strong>{" "}
                  {item.missingSkills?.join(", ") || "None 🎉"}
                </p>

                <div>
                  <strong>Suggestions:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    {item.suggestions?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Clear History
        </button>
      )}
    </div>
  );
}
