import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../../styles/English.css';

export default function EnglishQuiz() {
  // State to manage questions and user progress
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [latestScore, setLatestScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Load questions and restore saved progress on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        // Filter only English category with Normal difficulty
        const filteredQuestions = Array.isArray(data)
          ? data.filter((q) => q.category === "English" && q.difficulty === "Normal")
          : [];
        setQuestions(filteredQuestions);
      })
      .catch((error) => console.error("Error fetching questions:", error));

    // Retrieve progress from localStorage
    const savedProgress = localStorage.getItem("englishQuizProgress");
    const savedCorrectAnswers = localStorage.getItem("englishCorrectAnswers");
    const savedBestScore = localStorage.getItem("englishBestScore");
    const savedLatestScore = localStorage.getItem("englishLatestScore");

    if (savedProgress) setCurrentQuestionIndex(Number(savedProgress));
    if (savedCorrectAnswers) setCorrectAnswers(Number(savedCorrectAnswers));
    if (savedBestScore) setBestScore(Number(savedBestScore));
    if (savedLatestScore) setLatestScore(Number(savedLatestScore));
  }, []);

  // Save current progress and update best/latest score if quiz ends
  useEffect(() => {
    localStorage.setItem("englishQuizProgress", currentQuestionIndex);
    localStorage.setItem("englishCorrectAnswers", correctAnswers);

    if (questions.length > 0 && currentQuestionIndex === questions.length && !quizCompleted) {
      const previousBest = Number(localStorage.getItem("englishBestScore")) || 0;

      // Save latest attempt
      localStorage.setItem("englishLatestScore", correctAnswers);
      setLatestScore(correctAnswers);

      // Update best score if user improved
      if (correctAnswers > previousBest) {
        localStorage.setItem("englishBestScore", correctAnswers);
        setBestScore(correctAnswers);
      }

      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]);

  // When an answer is selected, check correctness and update score
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // Proceed to next question
  const nextQuestion = () => {
    setSelectedAnswer("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const question = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  // Show loading message while questions are being fetched
  if (!questions.length) {
    return <p className="text-center">Loading English Questions...</p>;
  }

  // Display final score after quiz completion
  if (quizCompleted || currentQuestionIndex >= questions.length) {
    return (
      <div className="english-quiz-container">
        <h1 className="english-h1">🎉 Quiz Completed! 🎉</h1>
        <p className="text-2xl font-bold">You got {correctAnswers} correct answers.</p>
        <p className="text-xl">Latest Score: {latestScore}</p>
        <p className="text-xl">Best Score: {bestScore}</p>

        {/* Navigation button */}
        <Link to="/categorySelection">
          <button className="back-button">Back to Categories</button>
        </Link>
      </div>
    );
  }

  return (
    <main>
      <header><br /><br /></header>
      <center>
        <div className="english-quiz-container">
          <h1 className="english-h1">English Quiz</h1>

          {/* Progress Bar */}
          <div className="english-progress-bar-container">
            <div className="english-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Display current question */}
          <h2 className="question">{question.question}</h2>

          {/* Multiple choice options */}
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`option-button ${
                  selectedAnswer
                    ? option === question.answer
                      ? "bg-green-500" // correct answer
                      : option === selectedAnswer
                      ? "bg-red-500" // selected wrong answer
                      : "bg-gray-200" // other unselected
                    : "bg-gray-200"
                }`}
                disabled={!!selectedAnswer} // disable once answered
              >
                {option}
              </button>
            ))}
          </div>

          {/* Show correctness feedback */}
          {selectedAnswer && (
            <p className="right-or-wrong">
              {selectedAnswer === question.answer
                ? "✅ Correct!"
                : `❌ Wrong! The correct answer is: ${question.answer}`}
            </p>
          )}

          {/* Next question button appears only after an answer is selected */}
          {selectedAnswer && (
            <button onClick={nextQuestion} className="next-question">
              Next Question →
            </button>
          )}

          <br />
          {/* Link back to categories */}
          <Link to="/categorySelection">
            <button className="back-button">Back</button>
          </Link>
        </div>
      </center>
    </main>
  );
}
