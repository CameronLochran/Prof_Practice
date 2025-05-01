import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../PCComponents/PcComponents'; // Possibly unnecessary import, unless it's doing side effects

export default function PcComponentsQuizHard() {
  // State variables to manage quiz flow
  const [questions, setQuestions] = useState([]); // Store fetched questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [selectedAnswer, setSelectedAnswer] = useState(""); // User's chosen answer
  const [correctAnswer, setCorrectAnswer] = useState(""); // Correct answer for feedback
  const [correctAnswers, setCorrectAnswers] = useState(0); // Total correct answers
  const [quizCompleted, setQuizCompleted] = useState(false); // Completion status

  // Fetch quiz questions from API and restore saved progress
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter only hard difficulty questions for pccomponents category
          const filteredQuestions = data.filter(
            (q) => q.category === "pccomponents" && q.difficulty === "Hard"
          );
          setQuestions(filteredQuestions);
        } else {
          setQuestions([]);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    // Retrieve previous quiz state from localStorage
    const savedProgress = localStorage.getItem("pccomponentsQuizProgress");
    const savedCorrectAnswers = localStorage.getItem("pccomponentsCorrectAnswers");

    if (savedProgress) setCurrentQuestionIndex(Number(savedProgress));
    if (savedCorrectAnswers) setCorrectAnswers(Number(savedCorrectAnswers));
  }, []);

  // Save quiz progress and update scores in localStorage
  useEffect(() => {
    localStorage.setItem("pccomponentsQuizProgress", currentQuestionIndex);
    localStorage.setItem("pccomponentsCorrectAnswers", correctAnswers);

    // When all questions answered and quiz isn't yet marked as completed
    if (questions.length && currentQuestionIndex >= questions.length && !quizCompleted) {
      setQuizCompleted(true);
      localStorage.setItem("pccomponentsLatestScore", correctAnswers); // Save last score

      // Update best score if this attempt is better
      const bestScore = Number(localStorage.getItem("pccomponentsBestScore")) || 0;
      if (correctAnswers > bestScore) {
        localStorage.setItem("pccomponentsBestScore", correctAnswers);
      }
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]);

  // Show loading text while fetching questions
  if (!questions.length) return <p className="text-center">Loading PC Components Questions...</p>;

  // If quiz is completed, show result screen
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

  // Get current question from the list
  const question = questions[currentQuestionIndex];

  // Handle user selecting an answer
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(question.answer);

    // If correct, increase score
    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // Proceed to next question
  const nextQuestion = () => {
    setSelectedAnswer("");
    setCorrectAnswer("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // Progress bar calculation
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <>
      <main>
        <header><br /><br /></header>
        <center>
          <div className="pccomponents-quiz-container">
            <h1 className="pccomponents-h1">PC Components Quiz</h1>

            {/* Progress Bar */}
            <div className="pccomponents-progress-bar-container">
              <div
                className="pccomponents-progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Question text */}
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
                        ? "bg-green-500" // Correct answer highlight
                        : option === selectedAnswer
                        ? "bg-red-500" // Incorrect selection
                        : "bg-gray-200" // Other options
                      : "bg-gray-200"
                  }`}
                  disabled={!!selectedAnswer} // Disable options after selection
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback after answer selection */}
            {selectedAnswer && (
              <p className="right-or-wrong">
                {selectedAnswer === correctAnswer
                  ? "✅ Correct!"
                  : `❌ Wrong! The correct answer is: ${correctAnswer}`}
              </p>
            )}

            {/* Show "Next" button only after an answer is selected */}
            {selectedAnswer && (
              <button onClick={nextQuestion} className="next-question">
                Next Question →
              </button>
            )}

            <br />
            {/* Navigation back to category menu */}
            <Link to="/categorySelection">
              <button className="back-button">Back</button>
            </Link>
          </div>
        </center>
      </main>
    </>
  );
}
