// Import necessary React hooks and components
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import '../../styles/MathsQuiz.css'; // Importing CSS for styling

export default function MathsQuizHard() {
  // State variables
  const [questions, setQuestions] = useState([]); // Stores fetched questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question index
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Stores user-selected answer
  const [correctAnswer, setCorrectAnswer] = useState(""); // Stores correct answer for feedback
  const [correctAnswers, setCorrectAnswers] = useState(0); // Counter for correct answers
  const [quizCompleted, setQuizCompleted] = useState(false); // Flag to track if quiz is completed

  // Fetch questions and load saved progress on component mount
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        // Filter questions for Maths category and Hard difficulty
        if (Array.isArray(data)) {
          const filteredQuestions = data.filter(
            (q) => q.category === "Maths" && q.difficulty === "Hard"
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

  // Save progress and score whenever progress updates
  useEffect(() => {
    localStorage.setItem("mathsQuizProgress", currentQuestionIndex);
    localStorage.setItem("mathsCorrectAnswers", correctAnswers);

    // If quiz is completed, save final score
    if (questions.length && currentQuestionIndex >= questions.length && !quizCompleted) {
      setQuizCompleted(true);
      localStorage.setItem("mathsLatestScore", correctAnswers);

      const bestScore = Number(localStorage.getItem("mathsBestScore")) || 0;
      if (correctAnswers > bestScore) {
        localStorage.setItem("mathsBestScore", correctAnswers); // Update best score
      }
    }
  }, [currentQuestionIndex, correctAnswers, questions, quizCompleted]);

  // Show loading message while fetching questions
  if (!questions.length) return <p className="text-center">Loading Maths Questions...</p>;

  // Show completion message once all questions are answered
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

  const question = questions[currentQuestionIndex]; // Current question object

  // When user selects an answer
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setCorrectAnswer(question.answer); // Store correct answer for feedback

    if (answer === question.answer) {
      setCorrectAnswers((prev) => prev + 1); // Increment correct answer count if right
    }
  };

  // Proceed to next question
  const nextQuestion = () => {
    setSelectedAnswer("");
    setCorrectAnswer("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const progress = (currentQuestionIndex / questions.length) * 100; // Calculate quiz progress

  return (
    <>
      <main>
        <header><br /><br /></header>
        <center>
          <div className="maths-quiz-container">
            <h1 className="maths-h1">Maths Quiz</h1>

            {/* Progress bar */}
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Display current question */}
            <h2 className="question">{question.question}</h2>

            {/* Display options */}
            <div className="options-grid mt-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`option-button ${
                    selectedAnswer
                      ? option === correctAnswer
                        ? "bg-green-500" // Show green if it's the correct answer
                        : option === selectedAnswer
                        ? "bg-red-500" // Show red if selected wrong answer
                        : "bg-gray-200" // Other options disabled
                      : "bg-gray-200"
                  }`}
                  disabled={!!selectedAnswer} // Disable all options once one is selected
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Feedback: Correct or Wrong */}
            {selectedAnswer && (
              <p className="right-or-wrong">
                {selectedAnswer === correctAnswer
                  ? "✅ Correct!"
                  : `❌ Wrong! The correct answer is: ${correctAnswer}`}
              </p>
            )}

            {/* Next Question Button */}
            {selectedAnswer && (
              <button onClick={nextQuestion} className="next-question">
                Next Question →
              </button>
            )}

            <br />
            {/* Back to category selection */}
            <Link to="/categorySelection">
              <button className="back-button">Back</button>
            </Link>
          </div>
        </center>
      </main>
    </>
  );
}
