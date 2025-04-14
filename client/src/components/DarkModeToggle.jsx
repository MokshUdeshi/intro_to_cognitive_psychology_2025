import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
