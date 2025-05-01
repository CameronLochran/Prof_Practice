import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../../styles/PcComponents.css';

export default function pccomponentsQuiz() {
  // State variables for quiz logic and UI
  const [questions, setQuestions] = useState([]); // All questions fetched
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of current question
  const [selectedAnswer, setSelectedAnswer] = useState(""); // User's selected option
  const [correctAnswer, setCorrectAnswer] = useState(""); // Correct option for feedback
  const [correctAnswers, setCorrectAnswers] = useState(0); // Tally of correct answers
  const [quizCompleted, setQuizCompleted] = useState(false); // Flag to determine quiz end

  // Fetch questions and restore saved progress on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter only PC Components questions with "Normal" difficulty
          const filteredQuestions = data.filter(
            (q) => q.category === "pccomponents" && q.difficulty === "Normal"
          );
          setQuestions(filteredQuestions);
        } else {
          setQuestions([]);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    // Load saved quiz state from localStorage
    const savedProgress = localStorage.getItem("pccomponentsQuizProgress");
    const savedCorrectAnswers = localStorage.getItem("pccomponentsCorrectAnswers");

    if (savedProgress) setCurrentQuestionIndex(Number(savedProgress));
    if (savedCorrectAnswers) setCorrectAnswers(Number(savedCorrectAnswers));
  }, []);

  // Save progress and update high scores
  useEffect(() => {
    localStorage.setItem("pccomponentsQuizProgress", currentQuestionIndex);
    localStorage.setItem("pccomponentsCorrectAnswers", correctAnswers);

    // If quiz is done and not yet marked complete
    if (questions.length && currentQuestionIndex >= questions.length && !quizCompleted) {
      setQuizCompleted(true);
      localStorage.setItem("pccomponentsLatestScore", correctAnswers); // Save latest score

      // Save best score if this one is higher
      const bestScore = Number(localStorage.getItem("pccomponentsBestScore")) || 0;
      if (correctAnswers > bestScore) {
        localStorage.setItem("pccomponentsBestScore", correctAnswers);
      }
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]);

  // If no questions yet, show loading
  if (!questions.length) return <p className="text-center">Loading PC Components Questions...</p>;

  // If all questions answered, show results
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

  // Current question to render
  const question = questions[currentQuestionIndex];

  // When user selects an answer
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(question.answer);

    // If correct, increment score
    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // Move to next question
  const nextQuestion = () => {
    setSelectedAnswer("");
    setCorrectAnswer("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // Calculate quiz progress percentage
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <>
      <main>
        <header><br/><br/></header>
        <center>
          <div className="pccomponents-quiz-container">
            <h1 className="pccomponents-h1">PC Components Quiz</h1>

            {/* Progress bar UI */}
            <div className="pccomponents-progress-bar-container">
              <div className="pccomponents-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Display question */}
            <h2 className="question">{question.question}</h2>

            {/* Answer options */}
            <div className="options-grid">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`option-button ${
                    selectedAnswer
                      ? option === correctAnswer
                        ? "bg-green-500" // Correct option
                        : option === selectedAnswer
                        ? "bg-red-500" // Selected but incorrect
                        : "bg-gray-200" // Not selected
                      : "bg-gray-200"
                  }`}
                  disabled={!!selectedAnswer} // Disable buttons after selection
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Show feedback */}
            {selectedAnswer && (
              <p className="right-or-wrong">
                {selectedAnswer === correctAnswer
                  ? "✅ Correct!"
                  : `❌ Wrong! The correct answer is: ${correctAnswer}`}
              </p>
            )}

            {/* Show next button if an answer was selected */}
            {selectedAnswer && (
              <button onClick={nextQuestion} className="next-question">
                Next Question →
              </button>
            )}

            <br />
            {/* Back button */}
            <Link to="/categorySelection">
              <button className="back-button">Back</button>
            </Link>
          </div>
        </center>
      </main>
    </>
  );
}
