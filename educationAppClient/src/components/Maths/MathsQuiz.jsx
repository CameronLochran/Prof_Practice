import { useState, useEffect } from "react"; // React hooks for state and lifecycle
import React from "react";
import { Link } from "react-router-dom"; // Navigation between pages
import '../../styles/MathsQuiz.css'; // External CSS styling

export default function MathsQuiz() {
  // State variables to manage quiz data and user interaction
  const [questions, setQuestions] = useState([]); // All questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question
  const [selectedAnswer, setSelectedAnswer] = useState(""); // User's selected answer
  const [correctAnswer, setCorrectAnswer] = useState(""); // Correct answer for feedback
  const [correctAnswers, setCorrectAnswers] = useState(0); // Score tracker
  const [quizCompleted, setQuizCompleted] = useState(false); // Flag for completion

  // Load questions and any saved quiz progress when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/questions") // Fetch questions from local API
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter only normal difficulty Maths questions
          const filteredQuestions = data.filter(
            (q) => q.category === "Maths" && q.difficulty === "Normal"
          );
          setQuestions(filteredQuestions);
        } else {
          setQuestions([]);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));

    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem("mathsQuizProgress");
    const savedCorrectAnswers = localStorage.getItem("mathsCorrectAnswers");

    if (savedProgress) setCurrentQuestionIndex(Number(savedProgress));
    if (savedCorrectAnswers) setCorrectAnswers(Number(savedCorrectAnswers));
  }, []);

  // Save progress and update score records
  useEffect(() => {
    // Store current progress and score
    localStorage.setItem("mathsQuizProgress", currentQuestionIndex);
    localStorage.setItem("mathsCorrectAnswers", correctAnswers);

    // If quiz is complete and not yet marked completed
    if (questions.length && currentQuestionIndex >= questions.length && !quizCompleted) {
      setQuizCompleted(true);
      localStorage.setItem("mathsLatestScore", correctAnswers); // Save latest score

      // Update best score if current score is higher
      const bestScore = Number(localStorage.getItem("mathsBestScore")) || 0;
      if (correctAnswers > bestScore) {
        localStorage.setItem("mathsBestScore", correctAnswers);
      }
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]);

  // Display loading message while fetching questions
  if (!questions.length) return <p className="text-center">Loading Maths Questions...</p>;

  // If quiz is finished, show summary
  if (currentQuestionIndex >= questions.length)
    return (
      <div className="maths-quiz-container">
        <h1 className="maths-h1">🎉 Quiz Completed! 🎉</h1>
        <p className="text-2xl font-bold">You got {correctAnswers} correct.</p>
        <Link to="/categorySelection">
          <button className="back-button">Back to Categories</button>
        </Link>
      </div>
    );

  // Get the current question
  const question = questions[currentQuestionIndex];

  // Handle user's answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer); // Store selected answer
    setCorrectAnswer(question.answer); // Set the correct answer for feedback

    // If correct, increment score
    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // Proceed to next question
  const nextQuestion = () => {
    setSelectedAnswer(""); // Reset selected answer
    setCorrectAnswer(""); // Reset correct answer
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
  };

  // Calculate progress bar percentage
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <>
      <main>
        <header><br /><br /></header>
        <center>
          <div className="maths-quiz-container">
            <h1 className="maths-h1">Maths Quiz</h1>

            {/* Progress Bar */}
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Display current question */}
            <h2 className="question">{question.question}</h2>

            {/* Render answer options */}
            <div className="options-grid mt-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`option-button ${
                    selectedAnswer
                      ? option === correctAnswer
                        ? "bg-green-500" // Green if correct
                        : option === selectedAnswer
                        ? "bg-red-500" // Red if selected and wrong
                        : "bg-gray-200" // Neutral for unselected
                      : "bg-gray-200"
                  }`}
                  disabled={!!selectedAnswer} // Disable buttons after answer is selected
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback on answer */}
            {selectedAnswer && (
              <p className="right-or-wrong">
                {selectedAnswer === correctAnswer
                  ? "✅ Correct!"
                  : `❌ Wrong! The correct answer is: ${correctAnswer}`}
              </p>
            )}

            {/* Show Next button after an answer is selected */}
            {selectedAnswer && (
              <button onClick={nextQuestion} className="next-question">
                Next Question →
              </button>
            )}

            <br />

            {/* Back button to return to category selection */}
            <Link to="/categorySelection">
              <button className="back-button">Back</button>
            </Link>
          </div>
        </center>
      </main>
    </>
  );
}
