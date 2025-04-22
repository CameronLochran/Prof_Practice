import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../styles/English.css';

export default function EnglishQuizHard() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch questions on component mount and load saved progress
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        const filteredQuestions = Array.isArray(data)
          ? data.filter((q) => q.category === "English" && q.difficulty === "Normal")
          : [];
        setQuestions(filteredQuestions);
      })
      .catch((error) => console.error("Error fetching questions:", error));

    const savedProgress = localStorage.getItem("englishQuizProgress");
    const savedCorrectAnswers = localStorage.getItem("englishCorrectAnswers");
    const savedBestScore = localStorage.getItem("englishBestScore");

    if (savedProgress) setCurrentQuestionIndex(Number(savedProgress));
    if (savedCorrectAnswers) setCorrectAnswers(Number(savedCorrectAnswers));
    if (savedBestScore) setBestScore(Number(savedBestScore));
  }, []);

  // Update progress and score in localStorage when quiz progresses
  useEffect(() => {
    localStorage.setItem("englishQuizProgress", currentQuestionIndex);
    localStorage.setItem("englishCorrectAnswers", correctAnswers);

    if (currentQuestionIndex >= questions.length && !quizCompleted) {
      setQuizCompleted(true);
      localStorage.setItem("englishLatestScore", correctAnswers);

      const previousBest = Number(localStorage.getItem("englishBestScore")) || 0;
      if (correctAnswers > previousBest) {
        localStorage.setItem("englishBestScore", correctAnswers);
        setBestScore(correctAnswers);
      }
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]);

  if (!questions.length) return <p className="text-center">Loading English Questions...</p>;

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="english-quiz-container">
        <h1 className="english-h1">🎉 Quiz Completed! 🎉</h1>
        <p className="text-2xl font-bold">You got {correctAnswers} correct answers.</p>
        <p className="text-xl">Best Score: {bestScore}</p>
        <Link to="/categorySelection">
          <button className="back-button">Back to Categories</button>
        </Link>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const progress = (currentQuestionIndex / questions.length) * 100;

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

          <h2 className="question">{question.question}</h2>
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`option-button ${
                  selectedAnswer
                    ? option === question.answer
                      ? "bg-green-500"
                      : option === selectedAnswer
                      ? "bg-red-500"
                      : "bg-gray-200"
                    : "bg-gray-200"
                }`}
                disabled={!!selectedAnswer}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <p className="right-or-wrong">
              {selectedAnswer === question.answer
                ? "✅ Correct!"
                : `❌ Wrong! The correct answer is: ${question.answer}`}
            </p>
          )}

          {selectedAnswer && (
            <button onClick={nextQuestion} className="next-question">
              Next Question →
            </button>
          )}

          <br />
          <Link to="/categorySelection">
            <button className="back-button">Back</button>
          </Link>
        </div>
      </center>
    </main>
  );
}
