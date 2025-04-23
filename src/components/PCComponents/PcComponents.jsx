import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../../styles/PcComponents.css';

export default function pccomponentsQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredQuestions = data.filter(
            (q) => q.category === "pccomponents" && q.difficulty === "Normal"
          );
          setQuestions(filteredQuestions);
        } else {
          setQuestions([]);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    const savedProgress = localStorage.getItem("pccomponentsQuizProgress");
    const savedCorrectAnswers = localStorage.getItem("pccomponentsCorrectAnswers");

    if (savedProgress) setCurrentQuestionIndex(Number(savedProgress));
    if (savedCorrectAnswers) setCorrectAnswers(Number(savedCorrectAnswers));
  }, []);

  useEffect(() => {
    localStorage.setItem("pccomponentsQuizProgress", currentQuestionIndex);
    localStorage.setItem("pccomponentsCorrectAnswers", correctAnswers);

    // Save score when quiz completes
    if (questions.length && currentQuestionIndex >= questions.length && !quizCompleted) {
      setQuizCompleted(true);
      localStorage.setItem("pccomponentsLatestScore", correctAnswers);

      const bestScore = Number(localStorage.getItem("pccomponentsBestScore")) || 0;
      if (correctAnswers > bestScore) {
        localStorage.setItem("pccomponentsBestScore", correctAnswers);
      }
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]);

  if (!questions.length) return <p className="text-center">Loading PC Components Questions...</p>;

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="pccomponents-quiz-container">
        <h1 className="pccomponents-h1">🎉 Quiz Completed! 🎉</h1>
        <p className="text-2xl font-bold">You got {correctAnswers} correct.</p>
        <Link to="/categorySelection">
          <button className="back-button">Back to Categories</button>
        </Link>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(question.answer);

    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer("");
    setCorrectAnswer("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <>
      <main>
        <header><br/><br/></header>
        <center>
          <div className="pccomponents-quiz-container">
            <h1 className="pccomponents-h1">PC Components Quiz</h1>

            {/* Progress Bar */}
            <div className="pccomponents-progress-bar-container">
              <div className="pccomponents-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <h2 className="question">{question.question}</h2>
            <div className="options-grid">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`option-button ${
                    selectedAnswer
                      ? option === correctAnswer
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
                {selectedAnswer === correctAnswer
                  ? "✅ Correct!"
                  : `❌ Wrong! The correct answer is: ${correctAnswer}`}
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
    </>
  );
}