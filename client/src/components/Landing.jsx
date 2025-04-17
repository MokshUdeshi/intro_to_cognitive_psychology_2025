import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Landing = () => {
  const [selectedWeek, setSelectedWeek] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedWeek) navigate(`/quiz/${selectedWeek}`);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300">
           Cognitive Psychology 2025
          </h1>

          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Week</option>
            {[...Array(12).keys()].map((i) => (
              <option key={i} value={`week-${i + 1}`}>
                Week {i + 1}
              </option>
            ))}
            <option value="first-6">First 6 Weeks</option>
            <option value="last-6">Last 6 Weeks</option>
            <option value="all-12">All 12 Weeks</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-semibold transition"
          >
            Start Quiz
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-500 dark:text-gray-400 p-4">
        Made by <strong>Aditya Rajput</strong> and <strong>Moksh Udeshi</strong>
      </footer>
    </div>
  );
};

export default Landing;

