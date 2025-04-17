import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import questionsData from "../data/questions";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Quiz = () => {
  const { week } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const loadQuestions = () => {
    let selectedQuestions = [];
    if (week === "first-6") {
      for (let i = 1; i <= 6; i++) {
        selectedQuestions.push(...questionsData[`week-${i}`]);
      }
    } else if (week === "last-6") {
      for (let i = 7; i <= 12; i++) {
        selectedQuestions.push(...questionsData[`week-${i}`]);
      }
    } else if (week === "all-12") {
      for (let i = 1; i <= 12; i++) {
        selectedQuestions.push(...questionsData[`week-${i}`]);
      }
    } else {
      selectedQuestions = questionsData[week] || [];
    }
    setQuestions(shuffleArray(selectedQuestions));
  };

  useEffect(() => {
    loadQuestions();
  }, [week]);

  const handleAnswer = (qIndex, selectedOption) => {
    if (answers[qIndex]) return;
    setAnswers({ ...answers, [qIndex]: selectedOption });
  };

  const restartQuiz = () => {
    setAnswers({});
    loadQuestions(); // reshuffle and reset questions
    window.scrollTo({ top: 0, behavior: "smooth" }); // scrolls smoothly to top
  };
  

  const score = Object.entries(answers).filter(
    ([index, ans]) => questions[index]?.answer === ans
  ).length;

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-8">
      <div className="w-full max-w-3xl space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 dark:text-blue-300">
          Quiz: {week.replace(/-/g, " ").toUpperCase()}
        </h2>

        {questions.map((q, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md space-y-3"
          >
            <p className="font-semibold">
              {index + 1}. {q.question}
            </p>
            {q.options.map((opt, i) => {
              const selected = answers[index];
              const isCorrect = opt === q.answer;
              const isSelected = selected === opt;

              let optionStyle =
                "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600";
              if (selected) {
                if (isCorrect)
                  optionStyle =
                    "bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-100";
                else if (isSelected)
                  optionStyle =
                    "bg-red-200 text-red-900 dark:bg-red-700 dark:text-red-100";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(index, opt)}
                  className={`block w-full text-left px-4 py-2 rounded-md font-medium ${optionStyle} transition`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ))}

        {allAnswered && (
          <div className="text-center mt-6 space-y-4">
            <h3 className="text-lg font-bold">
              Your Score: {score} / {questions.length}
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={restartQuiz}
                className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white rounded-lg font-medium transition"
              >
                Restart Quiz
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition"
              >
                Go to Landing Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;